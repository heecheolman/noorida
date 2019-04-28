const knex = require('./service.config');

module.exports = {
  insertWord: async ({ userId, word }) => {
    const result = await knex('search')
      .insert({ userId, word })
      .then(results => results)
      .catch(err => err);
    return result;
  },

  searchLocal: async ({ word }) => {
    const result = await knex('local')
      .select('localId', 'localName')
      .where('localName', 'LIKE', `%${word}%`)
      .then(results => results)
      .catch(err => err);
    return result;
  },

  searchUser: async ({ word, userId }) => {

    const subQuery = await knex('block')
      .where('myUserId', userId)
      .select('targetId')
      .then(rowData => JSON.parse(JSON.stringify(rowData)))
      .catch(err => err);

    let blockedUserList = [];

    for (let i in subQuery) {
      blockedUserList[i] = subQuery[i];
    }

    const result = await knex('users')
      .select('userId', 'nickName', 'avatar')
      .where('nickName', 'LIKE', `%${word}%`)
      .where('userId','not in', blockedUserList)
      .then(results => results)
      .catch(err => err);
    return result;
  },

  searchPostTitle: async ({ word, userId }) => {

    const subQuery = await knex('block')
      .where('myUserId', userId)
      .select('targetId')
      .then(rowData => JSON.parse(JSON.stringify(rowData)))
      .catch(err => err);

    let blockedUserList = [];

    for (let i in subQuery) {
      blockedUserList[i] = subQuery[i];
    }

    const result = await knex('contents')
      .select('users.userId',
        'users.nickName',
        'users.avatar',
        'contents.contentId',
        'contents.title',
        'contents.content',
        'local.localName')
      .where('contents.title', 'LIKE', `%${word}%`)
      .where('contents.Id','not in', blockedUserList)
      .join('users', 'users.userId', '=', 'contents.userId')
      .join('local', 'local.localId', '=', 'contents.localId')
      .then(results => results)
      .catch(err => err);
    return result;
  },
};
