const knex = require('./service.config');

module.exports = {
  findId: async ({ realName, email }) => {
    const result = await knex('users')
      .select('nickName')
      .where({ realName, email })
      .then(results => results)
      .catch(err => err);
    return result; // 검색 되는게 없으면 해당 이메일과 이름으로 가입한 유저가 없는 것임
  },
  findPassword: async ({ realName, nickName, email }) => {
    const result = await knex('users')
      .where({ realName, nickName, email })
      .then(results => results)
      .catch(err => err);
    return result; // 검색 되는게 없으면 해당 이메일과 이름으로 가입한 유저가 없는 것임
  },

  insertTmpPassword: async ({ email, tmpPassword }) => {
    /**
     * 임시 비밀번호가 너무 길어 업데이트가 안됨
     * 짧게 해야함
     * @type {any}
     */
    const result = await knex('users')
      .where({ email })
      .update({ password: tmpPassword })
      .then(results => results)
      .catch(err => err);
    return result; // 검색 되는게 없으면 해당 이메일과 이름으로 가입한 유저가 없는 것임
  },
};
