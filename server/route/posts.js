const postService = require('../service/post');
const express = require('express');

const router = express.Router();

/**
 * 뉴스 생성 */
router.post('', async (req, res) => {
  const { userId, title, content, address } = req.body;
  const result = await postService.publishNews({ userId, title, content, address })
    .then(results => results)
    .catch(err => err);
  res.json('ok');
});

/**
 * 지역 뉴스리스트 조회
 * */
router.get('/local', async (req, res) => {
  const { localName, lastId } = req.query;
  const result = await postService.loadPreviewLocalNewsList({ localName, lastId })
    .then(results => results)
    .catch(err => err);

  res.json(result);
});

/**
 * 특정 id 값 조회
 */
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const result = await postService.getPost({ id })
    .then(results => results)
    .catch(err => err);
  if (result) {
    res.json(result);
  } else {
    res.statusCode(500);
  }
});

/**
 * userId 가 갖는 포스트리스트들 조회
 */
router.get('/users/:userId', async (req, res) => {
  const { userId } = req.params;
  const { lastId } = req.query;
  const result = await postService.loadUserPostList({ userId, lastId })
    .then(results => results)
    .catch(err => err);

  res.json(result);
});

router.post('/emotion', async (req, res) => {
  const { userId, contentId, emotionCode } = req.body;
  const result = await postService.emotion({ contentId, userId, emotionCode })
    .then(results => results)
    .catch(err => err);
  res.json('ok');
});

router.get('/emotion', async (req, res) => {
  const { userId, contentId, emotionCode } = req.params;
  const result = await postService.countEmotion({ userId, contentId, emotionCode })
    .then(results => results)
    .catch(err => err);
  res.json(result);
});

router.put('/emotion', async (req, res) => {
  const { userId, contentId, emotionCode } = req.body;
  const result = await postService.editEmotion({ contentId, userId, emotionCode })
    .then(results => results)
    .catch(err => err);
  res.json('ok');
});

router.post('/evaluation', async (req, res) => {
  const { userId, contentId, score } = req.body;
  const result = await postService.evaluate({ userId, contentId, score })
    .then(results => results)
    .catch(err => err);
  return res.json('ok');
});

router.get('/evaluation/:userId', async (req, res) => {
  console.log('1');
  const { userId } = req.params;
  const result = await postService.getReliabilityScore({ userId })
    .then(results => results)
    .catch(err => err);
  return res.json(Object.values(result[0]))

});


router.get('/evaluation/check/is-evaluated', async (req, res) => {
  const { userId, contentId } = req.query;
  const result = await postService.isEvaluated({ userId, contentId })
    .then(results => results)
    .catch(err => err);
  if (result) {
    res.json(true);
  } else {
    res.json(false);
  }
});
module.exports = router;
