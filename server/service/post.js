const knex = require('./service.config');

module.exports = {
  publishNews: async ({ userId, title, content, address }) => {
    const localId = await knex('local')
      .where('localNAME', address)
      .then(async (rows) => {
        // local 테이블에 지역명이 존재하지않으면 새로 추가해주고 추가한 row 의 localId 을 return
        if (rows.length === 0) {
          return await knex('local')
            .returning('localId')
            .insert({ localNAME: address });
        }
        // 존재하는 경우엔 해당 지역명의 id 값을 보내줌
        const data = await knex('local')
          .select('localId')
          .where('localNAME', address)
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
    console.log(1);
    const localId = await knex('local')
      .where(localName)
      .then(async (rows) => {
        // local 테이블에 지역명이 존재하지않으면 새로 추가해주고 추가한 row 의 localId 을 return
        if (rows.length === 0) {
          return await knex('local')
            .returning('localId')
            .insert({ localName });
        }
        // 존재하는 경우엔 해당 지역명의 id 값을 보내줌
        const data = await knex('local')
          .select('localId')
          .where('localName')
          .then(rowData => JSON.parse(JSON.stringify(rowData)));
        return data[0].localId;
      })
      .catch(err => err);
    console.log(2);

    const result = await knex('contents')
      .join('users', 'users.userId', '=', 'contents.userId')
      .join('local', 'local.localId', '=', 'contents.localId')
      // .select('users.nickName', 'users.avatar', 'contents.title', 'contents.content', 'contents.updatedAt', 'local.localName')
      .select('users.nickName', 'contents.title', 'contents.content', 'contents.updatedAt')
      .where({ localId })
      .then(results => results)
      .catch(err => err);

    console.log(3);
    console.log('----------------------');
    console.log(result);
    return result;
  },
};
