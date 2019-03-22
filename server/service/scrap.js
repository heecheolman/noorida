const knex = require('./service.config');

module.exports = {
  scrap: async ({ userId, scrapId, contentId, time }) => {
    const result = await knex('scrap')
      .insert({ userId, scrapId, contentId, time })
      .then(results => results)
      .catch(err => err);
    return result;
  },

  loadScrapList: async ({ localName, lastId }) => {
    const LIMIT = 15;
    const extractedData = await knex('local')
      .where({ localName })
      .then(rowData => JSON.parse(JSON.stringify(rowData)))
      .catch(err => err);

    if (extractedData.length) {
      const extLocalName = extractedData[0].localName;

      if (extLocalName === localName) {
        const extLocalId = extractedData[0].localId;

        /* 초기일시 lastId 기준 처리 */
        const opr = lastId < 0
          ? '>'
          : '<';

        const result = await knex('contents')
          .select(
            'users.nickName',
            'users.avatar',
            'contents.contentId',
            'contents.title',
            'contents.content',
            'contents.updatedAt',
            'local.localName',
          )
          .where('local.localId', extLocalId)
          .where('contents.contentId', opr, lastId)
          .join('users', 'users.userId', '=', 'contents.userId')
          .join('local', 'local.localId', '=', 'contents.localId')
          .join('scrap', 'scrap.userId', '=', 'users.userId')
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
      }
    }
    return {};
  },

  cancelScrap: async ({ contentId, userId }) => {
    const result = await knex('scrap')
      .where({ contentId, userId })
      .del()
      .then(results => results)
      .catch(err => err);
    return result;
  },
};
