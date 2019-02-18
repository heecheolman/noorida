const knex = require('./service.config');

module.exports = {
  publishNews: async ({userNo, title, content, address}) => {
    const localNo = await knex('local')
      .where('localNAME', address)
      .then(async (rows) => {
        // local 테이블에 지역명이 존재하지않으면 새로 추가해주고 추가한 row 의 localNo 을 return
        if (rows.length === 0) {
          return await knex('local')
            .returning('localNo')
            .insert({localNAME: address});
        }
        // 존재하는 경우엔 해당 지역명의 id 값을 보내줌
        const data = await knex('local')
          .select('localNo')
          .where('localNAME', address)
          .then(rowData => JSON.parse(JSON.stringify(rowData)));
        return data[0].localNo;
      })
      .catch(err => err);

    // 그리고 콘텐츠에 insert
    const result = await knex('contents')
      .insert({userNo, title, content, localNo})
      .then(results => results)
      .catch(err => err);

    return result;
  },
  previewNewsList: async ({ localNo, moreContents }) => {
    const result = await knex('contents')
      .join('users', 'users.userNo', '=', 'contents.userNo')
      .join('local', 'local.localNo', '=', 'contents.localNo')
      .select('users.nickName', 'users.avatar', 'contnets.title', 'contents.content', 'contents.updatedAt', 'local.localName')
      .where(localNo)
      .limit(moreContents * 15)
      .offset(15)
      .then(results => results)
      .catch(err => err);
    return result;
  },
};