const express = require('express');
const scrapService = require('../service/scrap');

const router = express.Router();

router.post('', async (req, res) => {
  const { userId, scrapId, contentId, time } = req.body;
  const result = await scrapService.scrap({ userId, scrapId, contentId, time })
    .then(results => results)
    .catch(err => err);
  return res.json('ok');
});

router.get('', async (req, res) => {
  const { localName, lastId } = req.query;
  const result = await scrapService.loadScrapList({ localName, lastId })
    .then(results => results)
    .catch(err => err);

  res.json(result);
});

router.delete('', async (req, res) => {
  const { contentId, userId } = req.query;
  const result = await scrapService.cancelScrap({ contentId, userId })
    .then(results => results)
    .catch(err => err);
  return res.json('ok');
});

module.exports = router;
