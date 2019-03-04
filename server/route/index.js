const express = require('express');

const router = express.Router();

const authRouter = require('./auth');
const postsRouter = require('./posts');
const certRouter = require('./cert');
const uploadRouter = require('./upload');
const usersRouter = require('./users');
const commentsRouter = require('./comment');


router.use('/posts', postsRouter); // ok
router.use('/cert', certRouter); // ok
router.use('/upload', uploadRouter); // ok
router.use('/auth', authRouter); // not ok (find id, password)
router.use('/users', usersRouter); // ok
router.use('/comments', commentsRouter);


module.exports = router;

// api/comment
// api/commentList/${contentId}
//
// 브라우저 주소:  localhost:8080/post/:contentId
//
//
//
// api 설계: rest api
//
// 생성 : post api/comments
// 조회 : get api/comments
// 수정 : put api/comments/${id}}
// 삭제 : delete api/comments/${id}}