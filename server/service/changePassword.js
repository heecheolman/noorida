const knex = require('./service.config');

module.exports = {
  checkPassword: async ({ userId, oldPassword }) => {
    const result = await knex('users')
      .select('password')

      .where({ userId, password: oldPassword })
      .then(results => results)
      .catch(err => err);
    return result;
  },

  insertNewPassword: async ({ userId, newPassword }) => {
    const result = await knex('users')
      .where({ userId })
      .update({ password: newPassword })
      .then(results => results)
      .catch(err => err);
    return result;
  },
};

