const express = require('express');
const searchService = require('../service/search');

const router = express.Router();

router.post('', async (req, res) => {
  const { userId, word } = req.body;
  const result = await searchService.insertWord({ userId, word })
    .then(results => results)
    .catch(err => err);
  return res.json('ok');
});

router.get('/local', async (req, res) => {
  const userId = req.params;
  let { word } = req.query;
  word = decodeURI(word);
  
  const result = await searchService.searchLocal({ word, userId })
    .then(results => results)
    .catch(err => err);
  return res.json(result);
});

router.get('/user', async (req, res) => {
  const userId = req.params;
  let { word } = req.query;
  word = decodeURI(word);

  const result = await searchService.searchUser({ word, userId })
    .then(results => results)
    .catch(err => err);
  return res.json(result);
})

router.get('/post-title', async (req, res) => {
  let { word } = req.query;
  word = decodeURI(word);

  const result = await searchService.searchPostTitle({ word })
    .then(results => results)
    .catch(err => err);
  return res.json(result);
});

module.exports = router;
