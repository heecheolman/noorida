const knex = require('./service.config');

module.exports = {
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

  loadPreviewLocalNewsList: async ({ localName, lastId }) => {
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

        const result = await knex('contents')
          .select(
            'users.nickName',
            'contents.contentId',
            'contents.title',
            'contents.content',
            'contents.updatedAt',
            'local.localName',
          )
          .where('local.localId', extLocalId)
          .where('contents.contentId', opr, lastId)
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

  getPost: async ({ id }) => {
    /**
     * localId 를 가져와야하는가 */
    const result = await knex('contents')
      .select('userId', 'createdAt', 'updatedAt', 'title', 'content')
      .where('contentId', id)
      .then(results => results)
      .catch(err => err);

    return result.length
      ? JSON.parse(JSON.stringify(result))[0]
      : null;
  },

  emotion: async ({ userId, contentId, emotionCode }) => {
    const result = await knex('emotions')
      .insert({ userId, contentId, emotionCode })
      .then(results => results)
      .catch(err => err);
    return result;
  },
  editEmotion: async ({ userId, contentId, emotionCode }) => {
    const result = await knex('emotions')
      .update({ emotionCode })
      .where({ contentId, userId })
      .then(results => results)
      .catch(err => err)
    return result;
  },
  countEmotion: async ({ contentId, emotionCode }) => {
    const result = await knex('emotions')
      .count({ emotionCode })
      .where(contentId)
      .groupBy(emotionCode)
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
      .join('contents', 'contentId', '=', 'evaluation.contentId')
      .join('users', 'users.userId', '=', 'contents.userId')
      .sum('evaluation.score')
      .then(results => results);
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
};
