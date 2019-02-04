const knex = require('./service.config');

module.exports = {
  login: async ({ nickName, password }) => {
    const result = knex('users')
      .select('userNum', 'realName', 'nickName', 'email', 'avatar', 'description')
      .where({ nickName, password })
      .then(results => results)
      .catch(err => err);

    console.log('db result', result);

    return result;
  },
};
