const knex = require('./service.config');

module.exports = {
  comment: async ({ contentId, userId, commentContent }) => {
    const result = await knex('comments')
      .insert({ contentId, userId, commentContent })
      .then(results => results)
      .catch(err => err);
    return result;
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

  editComment: async ({ commentId, userId, commentContent }) =>{
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

