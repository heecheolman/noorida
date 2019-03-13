const express = require('express');
const blockService = require('../service/block');

const router = express.Router();

router.post('', async (req, res) => {
  const { applicant, blockedUser } = req.body;
  const result = await blockService.block({ applicant, blockedUser })
    .then(results => results)
    .catch(err => err);
  return res.json('ok');
});

router.get('', async (req, res) => {
  const { applicant } = req.query;
  const result = await blockService.blockList({ applicant })
    .then(results => results)
    .catch(err => err);
  return res.json(result);
});

router.get('/is-blocked', async (req, res) => {
  const { applicant, blockedUser } = req.query;
  const result = await blockService.isBlocked({ applicant, blockedUser })
    .then(results => results)
    .catch(err => err);
  if (result) {
    res.json(true);
  } else {
    res.json(false);
  }
});

router.delete('', async (req, res) => {
  const { applicant, blockedUser } = req.query;
  const result = await blockService.cancelBlock({ applicant, blockedUser })
    .then(results => results)
    .catch(err => err);
  return res.json('ok');
});

module.exports = router;
