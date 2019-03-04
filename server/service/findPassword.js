const knex = require('./service.config');

module.exports = {
  findPassword: async ({ realName, nickName, email }) => {
    const result = await knex('users')
      .where({ realName, nickName, email })
      .then(results => results)
      .catch(err => err);
    return result; // 검색 되는게 없으면 해당 이메일과 이름으로 가입한 유저가 없는 것임
  },

  changePassword: async ({email, tmpPassword}) => {
    const result = await knex('users')
        .where({ email })
        .update({password: tmpPassword} )
        .then(results => results)
        .catch(err => err);
    return result; // 검색 되는게 없으면 해당 이메일과 이름으로 가입한 유저가 없는 것임
  },
};

