const knex = require('./service.config');

module.exports = {
  login: async ({ nickName, password }) => {
    const result = await knex('users')
      .select('userId', 'realName', 'nickName', 'email', 'avatar', 'description')
      .where({ nickName, password })
      .then(results => results)
      .catch(err => err);
    return result.length ? JSON.parse(JSON.stringify(result))[0] : null;
  },
};
