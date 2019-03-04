const express = require('express');

const router = express.Router();

const authRouter = require('./auth');
const postsRouter = require('./posts');
const certRouter = require('./cert');
const uploadRouter = require('./upload');
const usersRouter = require('./users');


router.use('/posts', postsRouter); // ok
router.use('/cert', certRouter); // ok
router.use('/upload', uploadRouter); // ok
router.use('/auth', authRouter); // not ok (find id, password)
router.use('/users', usersRouter); // ok


module.exports = router;
