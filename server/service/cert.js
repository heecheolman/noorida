const knex = require('./service.config');

module.exports = {
  upsertUserToken: async ({ tmpEmail, tmpToken }) => {
    const QUERY = `INSERT INTO cert (tmpEmail, tmpToken) VALUES (?, ?) 
    ON DUPLICATE KEY UPDATE tmpEmail=VALUES(tmpEmail), tmpToken=VALUES(tmpToken)`;
    await knex.raw(QUERY, [tmpEmail, tmpToken])
      .then(results => results)
      .catch(err => err);
  },
  canCertified: async ({ tmpEmail, tmpToken }) => {
    const result = await knex('cert')
      .where({ tmpEmail, tmpToken })
      .then(results => results)
      .catch(err => err);
    return result.length !== 0;
  },

  compareEmail: async ({ email }) => {
    const result = await knex('users')
      .where({ email })
      .then(results => results)
      .catch(err => err);
    return result.length !== 0;
  },

  compareNickname: async ({ nickName }) => {
    const result = await knex('users')
      .where({ nickName })
      .then(results => results)
      .catch(err => err);
    return result.length !== 0;
  },
};
