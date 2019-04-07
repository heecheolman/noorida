const express = require('express');
const blockService = require('../service/block');

const router = express.Router();

router.post('', async (req, res) => {
  const { myUserId, targetId } = req.body;
  const result = await blockService.block({ myUserId, targetId })
    .then(results => results)
    .catch(err => err);
  return res.json('ok');
});

router.get('', async (req, res) => {
  const { myUserId } = req.query;
  const result = await blockService.blockList({ myUserId })
    .then(results => results)
    .catch(err => err);
  return res.json(result);
});

router.get('/is-blocked', async (req, res) => {
  const { myUserId, targetId } = req.query;
  const result = await blockService.isBlocked({ myUserId, targetId })
    .then(results => results)
    .catch(err => err);
  if (result) {
    res.json(true);
  } else {
    res.json(false);
  }
});

router.delete('', async (req, res) => {
  const { myUserId, targetId } = req.query;
  const result = await blockService.cancelBlock({ myUserId, targetId })
    .then(results => results)
    .catch(err => err);
  return res.json('ok');
});

module.exports = router;
