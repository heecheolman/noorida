const knex = require('./service.config');

module.exports = {
  isBlocked: async ({ myUserId, targetId }) => {
    const result = await knex('block')
      .select('myUserId', 'targetId')
      .where({ myUserId, targetId })
      .then(results => results)
      .catch(err => err);
    return result.length !== 0;
  },
  block: async ({ myUserId, targetId }) => {
    const result = await knex('block')
      .insert({ myUserId, targetId })
      .then(results => results)
      .catch(err => err);
    return result;
  },
  blockList: async ({ myUserId }) => {
    const result = await knex('block')
      .select('users.userId','users.nickName','users.avatar','block.targetId')
      .where({ myUserId })
      .join('users', 'user.Id','=', 'block.targetId')
      .then(results => results)
      .catch(err => err);
    return result;
  },
  cancelBlock: async ({ myUserId, targetId }) => {
    const result = await knex('block')
      .where({ myUserId, targetId })
      .del()
      .then(results => results)
      .catch(err => err);
    return result;
  },
};
