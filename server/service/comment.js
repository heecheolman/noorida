const knex = require('./service.config');

module.exports = {
  insertComment: async ({ contentId, userId, commentContent }) => {
    const result = await knex('comments')
      .insert({ contentId, userId, commentContent })
      .then(results => results)
      .catch(err => err);

    const commentCount = await knex('comments')
      .count('*')
      .where({ contentId })
      .then(results => Object.values(results[0])[0])
      .catch(err => err);

    const updateResult = await knex('hottopic')
      .update('comment', commentCount)
      .where({ contentId })
      .then(results => results)
      .catch(err => err);

    const sumData = await knex('hottopic')
      .select('sum')
      .where({ contentId })
      .then(results => Object.values(results[0])[0])
      .catch(err => err);
    
    const updateSum = await knex('hottopic')
      .update('sum', sumData + 1)
      .where({ contentId })
      .then(results => results)
      .catch(err => err);

    return updateResult;
  },

  commentList: async ({ contentId, lastId }) => {
    const LIMIT = 15;

    const opr = lastId < 0
      ? '>'
      : '<';

    const result = await knex('comments')
      .select('comments.commentId',
        'users.userId',
        'users.nickName',
        'users.avatar',
        'comments.commentContent',
        'comments.updatedAt',
      )
      .where('comments.contentId', contentId)
      .where('comments.commentId', opr, lastId)
      .where('comments.active', 'Y')
      .join('users', 'users.userId', '=', 'comments.userId')
      .join('contents', 'contents.contentId', '=', 'comments.contentId')
      .orderBy('comments.createdAt', 'desc')
      .limit(LIMIT)
      .then(results => JSON.parse(JSON.stringify(results)))
      .catch(err => err);

    lastId = lastId === -1 ? 0 : lastId;

    return {
      result,
      lastId: result.length ? result[result.length - 1].commentId : lastId,
      hasNextComment: result.length === LIMIT,
    };
  },

  editComment: async ({ commentId, userId, commentContent }) => {
    const result = await knex('comments')
      .update({ commentContent })
      .where({ commentId, userId })
      .then(results => results)
      .catch(err => err);
    return result;
  },

  disabledComment: async ({ commentId, userId }) => {
    const result = await knex('comments')
      .update('active', 'F')
      .where({ commentId, userId })
      .then(results => results)
      .catch(err => err);
    return result;
  },
};

