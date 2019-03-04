const knex = require('./service.config');

module.exports = {
  getUserProfileCard: async ({ id }) => {
    const result = await knex('users')
      .select('nickName', 'createdAt', 'avatar', 'description')
      .where('userId', id)
      .then(results => results)
      .catch(err => err);
    return result.length ? JSON.parse(JSON.stringify(result))[0] : null;
  },
  getUserInfo: async ({ id }) => {
    const result = await knex('users')
      .select('userId', 'nickName', 'createdAt', 'avatar', 'description', 'email')
      .where('userId', id)
      .then(results => results)
      .catch(err => err);
    return result.length ? JSON.parse(JSON.stringify(result))[0] : null;
  },
};
