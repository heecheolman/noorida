const knex = require('./service.config');

module.exports = {
  emotion: async ({ userId, contentId, emotionCode }) => {
    const result = await knex('emotions')
      .insert({ userId, contentId, emotionCode })
      .then(results => results)
      .catch(err => err);
    return result;
  },
  editEmotion: async ({ userId, contentId, emotionCode }) => {
    const result = await knex('emotions')
      .update({ emotionCode })
      .where({ contentId, userId })
      .then(results => results)
      .catch(err => err)
    return result;
  },
  countEmotion: async ({ contentId, emotionCode }) => {
    const result = await knex('emotions')
      .count({ emotionCode })
      .where(contentId)
      .groupBy(emotionCode)
      .then(results => results)
      .catch(err => err);
    return result;
  },
};

