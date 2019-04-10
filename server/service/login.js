const knex = require('./service.config');

module.exports = {
  getUserDataByNickname: async ({ nickName }) => {
    const result = await knex('users')
      .select('userId', 'realName', 'nickName', 'email', 'avatar', 'description')
      .where({ nickName })
      .then(results => results)
      .catch(err => err);
    return result;
  },

  login: async ({ nickName, password }) => {
    const result = await knex('users')
      .select('userId', 'realName', 'nickName', 'email', 'avatar', 'description')
      .where({ nickName, password })
      .then(results => results)
      .catch(err => err);
    return result.length ? JSON.parse(JSON.stringify(result))[0] : null;
  },

  getPasswordByNickname: async ({ nickName }) => {
    const result = await knex('users')
      .select('password')
      .where({ nickName })
      .then(results => results)
      .catch(err => err);
    return result;
  },
};
