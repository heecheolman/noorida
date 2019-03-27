const express = require('express');
const scrapService = require('../service/scrap');

const router = express.Router();

router.post('', async (req, res) => {
  const { userId, contentId } = req.body;
  const result = await scrapService.scrap({ userId, contentId })
    .then(results => results)
    .catch(err => err);
  return res.json('ok');
});

router.get('/:userId', async (req, res) => {
  const { lastId } = req.query;
  const { userId } = req.params;
  const result = await scrapService.loadScrapList({ userId, lastId })
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

router.get('/check/is-scraped', async (req, res) => {
  const { userId, contentId } = req.query;
  const result = await scrapService.isScraped({ userId, contentId })
    .then(results => results)
    .catch(err => err);
  if (result) {
    res.json(true);
  } else {
    res.json(false);
  }
});

module.exports = router;
