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
 */
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

module.exports = router;
