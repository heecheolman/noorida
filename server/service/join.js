const knex = require('./service.config');

module.exports = {
  /* insertUser: async ({ realName, nickName, password, email }) => {
    const result = await knex('users')
      .insert({ realName, nickName, password, email })
      .then(results => results)
      .catch(err => err);
    return result;
  }, */

  insertUser: async ({ realName, nickName, password, email }) => {
    const QUERY = 'INSERT INTO users (realName, nickName, password, email) VALUES (?,?,?,?)';
    await knex.raw(QUERY, [realName, nickName, password, email])
      .then(results => results)
      .catch(err => err);
  },
  compareToken: async ({ email, token }) => {
    const tokenData = await knex('users')
      .select('token')
      .where({ email })
      .then((result) => {
        console.log(result);
        return result;
      })
      .catch(err => err);
    return token === tokenData;
  },
  // activeSet: async ({ userId }) => {
  //   const settedActive = await knex('users')
  //     .where()
  //     .update({ active: 1 });
  // },
};