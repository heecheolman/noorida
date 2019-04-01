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
      .where('localName', 'Like', '%word%')
      .then(results => results)
      .catch(err => err);
    return result;
  },

  searchUser: async ({ word }) => {
    const result = await knex('users')
      .select('userId', 'nickName', 'avatar')
      .where('nickName', 'like', '%word%')
      .then(results => results)
      .catch(err => err);
    return result;
  },

  searchPostTitle: async ({ word }) => {
    const result = await knex('contents')
      .select('users.userId',
        'users.nickName',
        'users.avatar',
        'contents.contentId',
        'contents.title',
        'contents.content',
        'local.localName')
      .where('contents.title', 'like', '%word%')
      .join('users', 'users.userId', '=', 'contents.userId')
      .join('local', 'local.localId', '=', 'contents.localId')
      .then(results => results)
      .catch(err => err);
    return result;
  },
}
