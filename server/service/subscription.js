const knex = require('./service.config');

module.exports = {
  subscribeReporter: async ({ reader, reporter }) => {
    const result = await knex('subscriptionReporter')
      .insert({ reader, reporter })
      .then(results => results)
      .catch(err => err);
    return result;
  },

  subscribeLocal: async ({ reader, localId }) => {
    const result = await knex('subscriptionLocal')
      .insert({ reader, localId })
      .then(results => results)
      .catch(err => err);
    return result;
  },

  readerList: async ({ userId }) => {
    const result = await knex('subscriptionReporter')
      .select('users.nickName', 'users.avatar', 'subscriptionReporter.reader')
      .where('subscriptionReporter.reporter', userId)
      .join('users', 'users.userId', '=', 'subscriptionReporter.reader')
      .then(results => results)
      .catch(err => err);
    return result;
  },

  reporterList: async ({ userId }) => {
    const result = await knex('subscriptionReporter')
      .select('users.nickName', 'users.avatar', 'subscriptionReporter.reporter')
      .where('subscriptionReporter.reader', userId)
      .join('users', 'users.userId', '=', 'subscriptionReporter.reporter')
      .then(results => results)
      .catch(err => err);
    return result;
  },

  localList: async ({ userId }) => {
    const result = await knex('subscriptionLocal')
      .select('local.localName', 'subscriptionLocal.localId')
      .where('subscriptionLocal.reader', userId)
      .join('local', 'local.localId', '=', 'subscriptionLocal.localId')
      .then(results => results)
      .catch(err => err);
    return result;
  },
  cancelSubscriptionReporter: async ({ reader, reporter }) => {
    const result = await knex('subscriptionReporter')
      .where({ reader, reporter })
      .del()
      .then(results => results)
      .catch(err => err);
    return result;
  },

  cancelSubscriptionLocal: async ({ reader, localId }) => {
    const result = await knex('subscriptionLocal')
      .where({ reader, localId })
      .del()
      .then(results => results)
      .catch(err => err);
    return result;
  },

  isSubscribed: async ({ reader, reporter }) => {
    const result = await knex('subscriptionReporter')
      .where({ reader, reporter })
      .then(results => results)
      .catch(err => err);
    return result.length !== 0;
  },

  isLocalSubscribed: async ({ reader, localId }) => {
    const result = await knex('subscriptionLocal')
      .where({ reader, localId })
      .then(results => results)
      .catch(err => err);
    return result.length !== 0;
  },

  countSubscription: async ({ userId }) => {
    const countReader = await knex('subscriptionReporter')
      .count('*')
      .where('reporter', userId)
      .then(results => results)
      .catch(err => err);

    const countReporter = await knex('subscriptionReporter')
      .count('*')
      .where('reader', userId)
      .then(results => results)
      .catch(err => err);

    const countLocal = await knex('subscriptionLocal')
      .count('*')
      .where('reader', userId)
      .then(results => results)
      .catch(err => err);
    const result = { countReader, countReporter, countLocal };
    return result;
  },
};
