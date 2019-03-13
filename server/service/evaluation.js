const knex = require('./service.config');

module.exports = {

  evaluate: async ({ userId, contentId, score }) => {
    const result = await knex('evaluation')
      .insert({ userId, contentId, score })
      .then(results => results)
      .catch(err => err);
    return result;
  },
  // 자신이 작성한 게시글에 대한 평가 점수의 총합
  getReliabilityScore: async ({ userId }) => {
    const result = await knex('evaluation')
      .where({ userId })
      .join('contents', 'contentsId', '=', 'evaluation.contentId')
      .join('users', 'users.userId', '=', 'contents.userId')
      .sum('evaluation.score')
      .then(results => results);
    return result;
  },
  // 게시글에 대한 평가 점수의 총 합
  getEvaluationScore: async ({ userId, contentId }) => {
    const result = await knex('evaluation')
      .where({ userId, contentId })
      .join('contents', 'contentsId', '=', 'evaluation.contentId')
      .join('users', 'users.userId', '=', 'contents.userId')
      .sum('evaluation.score')
      .then(results => results);
    return result;
  },
};

