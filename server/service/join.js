const knex = require('./service.config');

module.exports = {
  insertUser: async ({ nickName, password, email, token }) => {
    const result = await knex('users')
      .insert({ nickName, password, email, token })
      .then(results => results)
      .catch(err => err);
    return result;
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
