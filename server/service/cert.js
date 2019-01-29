const knex = require('./service.config');

module.exports = {
  upsertUserToken: async ({ tmpEmail, tmpToken }) => {
    const QUERY = `INSERT INTO cert (tmpEmail, tmpToken) VALUES (?, ?) 
    ON DUPLICATE KEY UPDATE tmpEmail=VALUES(tmpEmail), tmpToken=VALUES(tmpToken)`;
    await knex.raw(QUERY, [tmpEmail, tmpToken])
      .then(results => results)
      .catch(err => err);
  },
};
