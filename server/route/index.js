const express = require('express');

const router = express.Router();

const authRouter = require('./auth');
const postsRouter = require('./posts');
const certRouter = require('./cert');
const uploadRouter = require('./upload');
const usersRouter = require('./users');
const commentsRouter = require('./comment');
const changePasswordRouter = require('./changePassword');
const subscriptionRouter = require('./subscription');
const blockRouter = require('./block');


router.use('/posts', postsRouter); // ok
router.use('/cert', certRouter); // ok
router.use('/upload', uploadRouter); // ok
router.use('/auth', authRouter); // not ok (find id, password)
router.use('/users', usersRouter); // ok
router.use('/comments', commentsRouter);
router.use('/change-Password', changePasswordRouter);
router.use('/subscription', subscriptionRouter);
router.use('/block', blockRouter);


module.exports = router;
