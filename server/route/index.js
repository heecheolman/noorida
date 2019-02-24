const express = require('express');
const multer = require('multer');
const joinService = require('../service/join');
const loginService = require('../service/login');
const postService = require('../service/post');
const findService = require('../service/findId');


const router = express.Router();

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, '../client/static/images');
  },
  filename(req, file, cb) {
    cb(null, file.originalname);
  },
});

const limits = {
  fileSize: 5000000,
};

const upload = multer({
  storage,
  limits,
});

router.post('/join', async (req, res) => {
  const result = await joinService.insertUser({
    realName: req.body.realName,
    nickName: req.body.nickName,
    password: req.body.password,
    email: req.body.email })
    .then(results => results)
    .catch(error => error);
  if (result) {
    res.sendStatus(200);
  } else {
    res.sendStatus(500);
  }
});

router.post('/login', async (req, res) => {
  const result = await loginService.login({
    nickName: req.body.nickName,
    password: req.body.password,
  })
    .then(results => results)
    .catch(err => err);

  if (result.length === 1) {
    res.json({
      data: result[0],
      loginStatus: true,
    });
  } else {
    res.json({
      data: null,
      loginStatus: false,
    });
  }
});

router.post('/upload/image', upload.single('image'), (req, res) => {
  // file:
  // { fieldname: 'image',
  //   originalname: '스크린샷 2019-02-06 오후 8.59.17.png',
  //   encoding: '7bit',
  //   mimetype: 'image/png',
  //   destination: '../client/static/images',
  //   filename: '스크린샷 2019-02-06 오후 8.59.17.png',
  //   path: '../client/static/images/스크린샷 2019-02-06 오후 8.59.17.png',
  //   size: 408267 } }
  const url = req.file.filename;
  res.send(url);
});

router.post('/post/news', async (req, res) => {
  const { userId, title, content, address } = req.body;
  const result = await postService.publishNews({ userId, title, content, address })
    .then(results => results)
    .catch(err => err);

  res.json('ok');
});

router.get('/find-id', async (req, res) => {
  const { realName, email } = req.params;
  const result = await findService.findId({ realName, email })
    .then(results => results)
    .catch(err => err);
  if (result) {
    res.send(result[0]);
  } else {
    res.send(false);
  }
});

router.get('/posts/local', async (req, res) => {
  const { localName, lastId } = req.query;
  const result = await postService.loadPreviewLocalNewsList({ localName, lastId })
    .then(results => results)
    .catch(err => err);

  res.json(result);
});

router.get('/post/:id', async (req, res) => {
  const { id } = req.params;
  const result = await postService.getPost({ id })
    .then(results => results)
    .catch(err => err);
  if (result.length) {
    res.json(result[0]);
  } else {
    res.statusCode(500);
  }
});
module.exports = router;
