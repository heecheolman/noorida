const knex = require('./service.config');

module.exports = {
  scrap: async ({ userId, contentId }) => {
    const result = await knex('scrap')
      .insert({ userId, contentId })
      .then(results => results)
      .catch(err => err);
    return result;
  },

  loadScrapList: async ({ userId, lastId }) => {
    const LIMIT = 15;

    /* 초기일시 lastId 기준 처리 */
    const opr = lastId < 0
      ? '>'
      : '<';

    const result = await knex('contents')
      .select(
        'users.userId', 'users.nickName', 'users.avatar', 'contents.contentId', 'contents.title', 'contents.content', 'contents.updatedAt', 'local.localName')
      .where('scrap.userId', userId)
      .where('contents.active', 'Y')
      .join('users', 'users.userId', '=', 'contents.userId')
      .join('local', 'local.localId', '=', 'contents.localId')
      .join('scrap', 'scrap.contentId', '=', 'contents.contentId')
      .orderBy('contents.createdAt', 'desc')
      .limit(LIMIT)
      .then(results => results)
      .catch(err => err);

    /* 초기일시 lastId 기준 처리 */
    lastId = lastId === -1 ? 0 : lastId;

    return {
      result,
      lastId: result.length ? result[result.length - 1].contentId : lastId,
      hasNextPost: result.length === LIMIT,
    };
  },

  cancelScrap: async ({ contentId, userId }) => {
    const result = await knex('scrap')
      .where({ contentId, userId })
      .del()
      .then(results => results)
      .catch(err => err);
    return result;
  },

  isScraped: async ({ userId, contentId }) => {
    const result = await knex('scrap')
      .select('*')
      .where({ contentId, userId })
      .then(results => results)
      .catch(err => err);
    return result.length !== 0;
  },
};
