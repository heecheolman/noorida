const knex = require('./service.config');

module.exports = {
  subscribeReporter: async ({ reader, reporter }) => {
    const result = await knex('subscription')
      .insert({ reader, reporter })
      .then(results => results)
      .catch(err => err)
    return result;
  },

  subscribeLocal: async ({ reader, localId }) => {
    const result = await knex('subscription')
      .insert({ reader, localId })
      .then(results => results)
      .catch(err => err)
    return result;
  },



}