const knex = require('./service.config');

module.exports = {
  insertUser: async ({ realName, nickName, password, email }) => {
    const result = await knex('users')
      .insert({ realName, nickName, password, email })
      .then(results => results)
      .catch(err => err);
    return result;
  },
};
