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


        /* 처음일시 lastId 기준 처리 */
        let opr = '';
        if (lastId < 0) {
          opr = '>';
        } else {
          opr = '<';
        }

        console.log('lastId', lastId);

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

        // 여기서 문제임

        if (lastId === -1) {
          lastId = 0;
        }

        console.log('result', result);

        const resData = {
          result,
          lastId: result.length ? result[result.length - 1].contentId : lastId,
          hasNextPost: result.length === LIMIT,
        };

        return resData;
      }
    }
    return {};
  },

  // previewNewsList: async ({ localName }) => {
  //   const extractedData = await knex('local')
  //     .where({ localName })
  //     .then(rowData => JSON.parse(JSON.stringify(rowData)))
  //     .catch(err => err);
  //
  //   if (extractedData.length) {
  //     const extLocalName = extractedData[0].localName;
  //
  //     if (extLocalName === localName) {
  //       const extLocalId = extractedData[0].localId;
  //       const result = await knex('contents')
  //         .select('users.nickName', 'contents.title', 'contents.content', 'contents.updatedAt', 'local.localName')
  //         .where('local.localId', extLocalId)
  //         .join('users', 'users.userId', '=', 'contents.userId')
  //         .join('local', 'local.localId', '=', 'contents.localId')
  //         .limit(moreContents * 15)
  //         .offset(15)
  //         .then(results => results)
  //         .catch(err => err);
  //       return result;
  //     }
  //   }
  //   return {};
  // },
};
