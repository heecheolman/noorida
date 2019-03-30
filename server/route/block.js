const express = require('express');
const blockService = require('../service/block');

const router = express.Router();

router.post('', async (req, res) => {
  const { myUserId, targetUserId } = req.body;
  const result = await blockService.block({ applicant: myUserId, blockedUser: targetUserId })
    .then(results => results)
    .catch(err => err);
  return res.json('ok');
});

router.get('', async (req, res) => {
  const { myUserId, targetUserId } = req.query;
  const result = await blockService.blockList({ applicant: myUserId })
    .then(results => results)
    .catch(err => err);
  return res.json(result);
});

router.get('/is-blocked', async (req, res) => {
  const { myUserId, targetUserId } = req.query;
  const result = await blockService.isBlocked({ applicant: myUserId, blockedUser: targetUserId })
    .then(results => results)
    .catch(err => err);
  if (result) {
    res.json(true);
  } else {
    res.json(false);
  }
});

router.delete('', async (req, res) => {
  const { myUserId, targetUserId } = req.query;
  const result = await blockService.cancelBlock({ applicant: myUserId, blockedUser: targetUserId })
    .then(results => results)
    .catch(err => err);
  return res.json('ok');
});

module.exports = router;
