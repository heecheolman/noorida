const emotionService = require('../service/emotion');
const express = require('express');

const router = express.Router();


router.post('/emotion', async (req, res) => {
  const { userId, contentId, emotionCode } = req.body;
  const result = await emotionService.emotion({ contentId, userId, emotionCode })
    .then(results => results)
    .catch(err => err);
  res.json('ok');
});

router.get('/emotion', async (req, res) => {
  const { userId, contentId, emotionCode } = req.query;
  const result = await emotionService.countEmotion({ userId, contentId, emotionCode })
    .then(results => results)
    .catch(err => err);
  res.json(result);
});

router.put('/emotion', async (req, res) => {
  const { userId, contentId, emotionCode } = req.body;
  const result = await emotionService.editEmotion({ contentId, userId, emotionCode })
    .then(results => results)
    .catch(err => err);
  res.json('ok');
});

module.exports = router;
