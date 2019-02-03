const knex = require('./service.config');

module.exports = {
  insertUser: async ({ realName, nickName, password, email }) => {
    const result = await knex('users')
      .insert({ realName, nickName, password, email })
      .then(results => results)
      .catch(err => err);
    return result;
  },
  // insertUser: async ({ realName, nickName, password, email }) => {
  //   const QUERY = 'INSERT INTO users (realName, nickName, password, email) VALUES (?,?,?,?)';
  //   await knex.raw(QUERY, [realName, nickName, password, email])
  //     .then(results => results)
  //     .catch(err => err);
  // },
};
