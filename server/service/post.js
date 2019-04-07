const knex = require('./service.config');

module.exports = {
  /**
   * 게시글 작성
   */

  publishNews: async ({ userId, title, content, address }) => {
    const localId = await knex('local')
      .where('localName', address)
      .then(async (rows) => {
        // local 테이블에 지역명이 존재하지않으면 새로 추가해주고 추가한 row 의 localId 을 return
        if (rows.length === 0) {
          return await knex('local')
            .returning('localId')
            .insert({ localName: address });
        }
        // 존재하는 경우엔 해당 지역명의 id 값을 보내줌
        const data = await knex('local')
          .select('localId')
          .where('localName', address)
          .then(rowData => JSON.parse(JSON.stringify(rowData)));
        return data[0].localId;
      })
      .catch(err => err);

    // 그리고 콘텐츠에 insert
    const result = await knex('contents')
      .insert({ userId, title, content, localId })
      .then(results => results)
      .catch(err => err);

    return result;
  },

  /**
   * 지역 소식 미리보기 list
   */
  loadPreviewLocalNewsList: async ({ localName, lastId, userId }) => {
    const LIMIT = 15;
    const extractedData = await knex('local')
      .where({ localName })
      .then(rowData => JSON.parse(JSON.stringify(rowData)))
      .catch(err => err);

    if (extractedData.length) {
      const extLocalName = extractedData[0].localName;
      if (extLocalName === localName) {
        const extLocalId = extractedData[0].localId;

        /* 초기일시 lastId 기준 처리 */
        const opr = lastId < 0
          ? '>'
          : '<';

        const subQuery = await knex('block')
          .where('myUserId', userId)
          .select('targetId')
          .then(rowData => JSON.parse(JSON.stringify(rowData)))
          .catch(err => err);

        let blockedUserList = [];
        subQuery.forEach(ele => blockedUserList.push(ele.targetId));

        const result = await knex('contents')
          .select(
            'users.nickName',
            'users.avatar',
            'contents.contentId',
            'contents.title',
            'contents.content',
            'contents.updatedAt',
            'contents.views',
            'local.localName',
          )
          .where('local.localId', extLocalId)
          .where('contents.contentId', opr, lastId)
          .where('contents.userId', 'not in', blockedUserList)
          .where('contents.active', 'Y')
          .join('users', 'users.userId', '=', 'contents.userId')
          .join('local', 'local.localId', '=', 'contents.localId')
          .orderBy('contents.createdAt', 'desc')
          .limit(LIMIT)
          .then(results => results)
          .catch(err => err);

        /* 초기일시 lastId 기준 처리 */
        lastId = lastId === -1 ? 0 : lastId;

        return {
          result,
          lastId: result.length ? result[result.length - 1].contentId : lastId,
          hasNextPost: result.length === LIMIT,
        };
      }
    }
    return {};
  },

  /**
   * 유저가 작성한 게시글 list
   */

  loadUserPostList: async ({ userId, lastId }) => {
    const LIMIT = 15;
    const opr = lastId < 0
      ? '>'
      : '<';

    const result = await knex('contents')
      .select('*')
      .where('userId', userId)
      .where('contentId', opr, lastId)
      .orderBy('createdAt', 'desc')
      .limit(LIMIT)
      .then(results => results)
      .catch(err => err);

    lastId = lastId === -1 ? 0 : lastId;

    return {
      result,
      lastId: result.length ? result[result.length - 1].contentId : lastId,
      hasNextPost: result.length === LIMIT,
    };
  },

  /**
   * 지역관련 포스트  list
   * localId 필요
   * 검색 페이지 에서 사용 하면 됨
   */

  loadLocalPostList: async ({ localId, lastId }) => {
    const LIMIT = 15;
    const opr = lastId < 0
      ? '>'
      : '<';

    const result = await knex('contents')
      .select('users.userId',
        'users.nickName',
        'users.avatar',
        'contents.contentId',
        'contents.title',
        'contents.content',
        'local.localName')
      .where('local.localId', localId)
      .join('users', 'users.userId', '=', 'contents.userId')
      .join('local', 'local.localId', '=', 'contents.localId')
      .then(results => results)
      .catch(err => err);


    lastId = lastId === -1 ? 0 : lastId;

    return {
      result,
      lastId: result.length ? result[result.length - 1].contentId : lastId,
      hasNextPost: result.length === LIMIT,
    };
  },

  getPost: async ({ id }) => {
    /**
     * localId 를 가져와야하는가 */
    let result = await knex('contents')
      .select('userId', 'createdAt', 'updatedAt', 'title', 'content', 'views', 'localId')
      .where('contentId', id)
      .then(results => JSON.parse(JSON.stringify(results))[0])
      .catch(err => err);
    let localNameData = {};
    if (result.hasOwnProperty('localId')) {
      localNameData = await knex('local')
        .select('localName')
        .where('localId', result.localId)
        .then(localData => JSON.parse(JSON.stringify(localData))[0])
        .catch(e => e);
    }
    result = {
      ...result,
      ...localNameData,
    };
    return result;
  },

  emotion: async ({ userId, contentId, emotionCode }) => {
    const extractedRow = await knex('emotions')
      .select('emotionId')
      .where({ userId, contentId })
      .then(results => results)
      .catch(err => err);
    if (extractedRow.length) {
      const result = await knex('emotions')
        .update({ emotionCode })
        .where({ contentId, userId })
        .then(results => results)
        .catch(err => err);
      return result;
    }
    const result = await knex('emotions')
      .insert({ userId, contentId, emotionCode })
      .then(results => results)
      .catch(err => err);
    return result;
  },

  countEmotion: async ({ contentId }) => {
    const countLike = await knex('emotions')
      .count('emotionCode')
      .where({ contentId })
      .where('emotionCode', 1)
      .then(results => results)
      .catch(err => err);

    const countHappy = await knex('emotions')
      .count('emotionCode')
      .where({ contentId })
      .where('emotionCode', 2)
      .then(results => results)
      .catch(err => err);

    const countAngry = await knex('emotions')
      .count('emotionCode')
      .where({ contentId })
      .where('emotionCode', 3)
      .then(results => results)
      .catch(err => err);

    const countSad = await knex('emotions')
      .count('emotionCode')
      .where({ contentId })
      .where('emotionCode', 4)
      .then(results => results)
      .catch(err => err);


    return {
      like: Object.values(countLike[0])[0],
      happy: Object.values(countHappy[0])[0],
      angry: Object.values(countAngry[0])[0],
      sad: Object.values(countSad[0])[0],
    };
  },

  isExpressedEmotion: async ({ userId, contentId }) => {
    const result = await knex('emotions')
      .select('emotionCode')
      .where({ userId, contentId })
      .then(results => results)
      .catch(err => err);
    return result;
  },

  evaluate: async ({ userId, contentId, score }) => {
    const result = await knex('evaluation')
      .insert({ userId, contentId, score })
      .then(results => results)
      .catch(err => err);
    return result;
  },
  // 자신이 작성한 게시글에 대한 평가 점수의 총합
  getReliabilityScore: async ({ userId }) => {
    const result = await knex('evaluation')
      .where('contents.userId', userId)
      .join('contents', 'contents.contentId', '=', 'evaluation.contentId')
      .join('users', 'users.userId', '=', 'contents.userId')
      .sum('evaluation.score')
      .then(results => results)
      .catch(err => err);
    return result;
  },
  // 평가 했는지 안했는지 확인
  isEvaluated: async ({ userId, contentId }) => {
    const result = await knex('evaluation')
      .select('*')
      .where({ userId, contentId })
      .then(results => results)
      .catch(err => err);
    return result.length !== 0;
  },

  insertViews: async ({ userId, contentId }) => {
    const result = await knex('view')
      .insert({ userId, contentId })
      .then(results => results)
      .catch(err => err);

    /**
     * view table 계속해서 데이터가 쌓이지 않음
     * 아마도 pk값이 이미 들어가있어서 그런듯
     * 수정 필요
     */
    const viewCount = await knex('view')
      .count('*')
      .where({ contentId })
      .then(results => Object.values(results[0])[0])
      .catch(err => err);
    const updateResult = await knex('contents')
      .update('views', viewCount)
      .where({ contentId })
      .then(results => results)
      .catch(err => err);

    return result;
  },
};
