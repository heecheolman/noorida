const commentService = require('../service/comment');
const express = require('express');

const router = express.Router();
/**
 * 댓글 생성 */
router.post('', async (req, res) => {
  const { contentId, userId, commentContent } = req.body;
  const result = await commentService.comment({ contentId, userId, commentContent })
    .then(results => results)
    .catch(err => err);
  res.json('ok');
});

/**
 * 댓글 보기 */
router.get('', async (req, res) => {
  const { lastId, contentId } = req.query;
  const result = await commentService.commentList({ contentId, lastId })
    .then(results => results)
    .catch(err => err);
  res.json(result);
});

/**
 * 댓글 수정 */

router.put('comments/:commentsId', async (req, res) => {
  const { commentId, userId, commentContent } = req.body;
  const result = await commentService.editComment({ commentId, userId, commentContent })
    .then(results => results)
    .catch(err => err);
  res.json('ok');
});

/**
 * 댓글 삭제 */
router.put('disabledComments/:commentsId', async (req, res) => {
  const { commentId, userId } = req.body;
  const result = await commentService.disabledComment({ commentId, userId })
    .then(results => results)
    .catch(err => err);
  res.json('ok');
});

module.exports = router;
