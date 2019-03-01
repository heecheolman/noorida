const knex = require('./service.config');

module.exports = {
  getUser: async ({ id }) => {
    const result = await knex('users')
      .select('nickName', 'createdAt', 'avatar', 'description')
      .where('userId', id)
      .then(results => results)
      .catch(err => err);
    return result.length ? JSON.parse(JSON.stringify(result))[0] : null;
  },
};
