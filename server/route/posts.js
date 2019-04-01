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
  const { localName, lastId, userId  } = req.query;
  const result = await postService.loadPreviewLocalNewsList({ localName, lastId, userId })
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

/**
 * localId 가 갖는 포스트리스트들 조회
 */
router.get('/users/:localId', async (req, res) => {
<<<<<<< HEAD
  const { localId, lastId } = req.params;
  const result = await postService.loadLocalPostList({ localId, lastId })
=======
  const { localId, lastId, userId } = req.params;
  const result = await postService.loadLocalPostList({ localId, lastId, userId })
>>>>>>> 863b4d52594403d67a280f98bd99b55d8d13e6ee
    .then(results => results)
    .catch(err => err);

  res.json(result);
});

/**
 * 게시글에 감정 표현
 * 이미 표현 하였으면 emotionCode 만 update
 */
router.post('/emotion', async (req, res) => {
  const { userId, contentId, emotionCode } = req.body;
  const result = await postService.emotion({ contentId, userId, emotionCode })
    .then(results => results)
    .catch(err => err);
  res.json('ok');
});

/**
 * 평가 여부 확인
 */

router.get('/emotion/check/is-expressed', async (req, res) => {
  const { userId, contentId } = req.query;
  const result = await postService.isExpressedEmotion({ userId, contentId })
    .then(results => results)
    .catch(err => err);
  if (result.length !== 0) {
    res.json(result[0]);
  } else {
    res.json({ emotionCode: 0 });
  }
});

/**
 * 각 감정들의 개수
 */


router.get('/emotions/count', async (req, res) => {
  const { contentId } = req.query;
  const result = await postService.countEmotion({ contentId })
    .then(results => results)
    .catch(err => err);
  res.json(result);
});

/**
 * 게시글 평가
 */

router.post('/evaluation', async (req, res) => {
  const { userId, contentId, score } = req.body;
  const result = await postService.evaluate({ userId, contentId, score })
    .then(results => results)
    .catch(err => err);
  return res.json('ok');
});

/**
 * 신뢰도 점수
 */


router.get('/evaluation/:userId', async (req, res) => {
  const { userId } = req.params;
  const result = await postService.getReliabilityScore({ userId })
    .then(results => results)
    .catch(err => err);
  const extractedScore = Object.values(result[0]);
  if (extractedScore[0]) {
    res.json(extractedScore[0]);
  } else {
    res.json(0);
  }
});

/**
 * 게시글 평가 여부 확인
 */


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