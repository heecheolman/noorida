const knex = require('./service.config');
const secret = require('../secret/index');
const key = 'keyValue';


module.exports = {
  upsertUserToken: async ({ tmpEmail, tmpToken }) => {
    const QUERY = `INSERT INTO cert (tmpEmail, tmpToken) VALUES (?, ?) 
    ON DUPLICATE KEY UPDATE tmpEmail=VALUES(tmpEmail), tmpToken=VALUES(tmpToken)`;
    const result = await knex.raw(QUERY, [tmpEmail, tmpToken])
      .then(results => results)
      .catch(err => err);
    return result;
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
      .select('email')
      .where({ email })
      .then(results => results)
      .catch(err => err);
    console.log(result);
    return result.length !== 0;
  },

  compareNickname: async ({ nickName }) => {
    const result = await knex('users')
      .select('nickName')
      .where({ nickName })
      .then(results => results)
      .catch(err => err);
    return result.length !== 0;
  },
};
