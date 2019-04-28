const knex = require('./service.config');
const secret = require('../secret/index');

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
  updateUserDescription: async ({ userId, description }) => {
    const result = await knex('users')
      .update({ description })
      .where({ userId })
      .then(results => results)
      .catch(err => err);
    return result;
  },
  updateUserProfile: async ({ userId, filename }) => {
    const result = await knex('users')
      .update('avatar', filename)
      .where({ userId })
      .then(results => results)
      .catch(err => err);
    return result;
  },
// 회원 탈퇴
  withdraw: async ({ userId, nickName ,password }) => {

    const correct = await knex('users')
      .select('*')
      .where({ userId, nickName })
      .then(result => (result.length ? secret.checkHashword(result[0].password, password) : false))
      .catch(err => err);

    if (correct) {
      const result = await knex('users')
        .update('active','N')
        .where({ userId })
        .then(results => results)
        .catch(err => err);

      return true;
    }
    return false;
  },
};
