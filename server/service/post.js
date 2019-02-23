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

  previewNewsList: async ({ localName }) => {
    const extractedData = await knex('local')
      .where({ localName })
      .then(rowData => JSON.parse(JSON.stringify(rowData)))
      .catch(err => err);


    console.log('localName', localName);
    console.log('ext data', extractedData);

    if (extractedData.length) {
      const extLocalName = extractedData[0].localName;

      if (extLocalName === localName) {
        const extLocalId = extractedData[0].localId;
        const result = await knex('contents')
          .select('users.nickName', 'contents.title', 'contents.content', 'contents.updatedAt', 'local.localName')
          .where('local.localId', extLocalId)
          .join('users', 'users.userId', '=', 'contents.userId')
          .join('local', 'local.localId', '=', 'contents.localId')
          .then(results => results)
          .catch(err => err);
        return result;
      }
    }
    return {};
  },
};
