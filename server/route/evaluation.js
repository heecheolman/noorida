const express = require('express');
const evaluationService = require('../service/evaluation');

const router = express.Router();

router.post('', async (req, res) => {
  const { userId, contendId, score } = req.body;
  const result = await evaluationService.evaluate({ userId, contendId, score })
    .then(results => results)
    .catch(err => err);
  return res.json('ok');
});

router.get('/reliability', async (req, res) => {
  const { userId } = req.query;
  const result = await evaluationService.getReliabilityScore({ userId })
    .then(results => results)
    .catch(err => err);
  return res.json(result);
});

router.get('', async (req, res) => {
  const { userId, contendId } = req.query;
  const result = await evaluationService.getEvaluationScore({ userId, contendId })
    .then(results => results)
    .catch(err => err);
  return res.json(result);
});

module.exports = router;
