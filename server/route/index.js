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
    res.json(result[0]);
  } else {
    res.send(false);
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
  const { userNo, title, content, address } = req.body;
  const result = await postService.publishNews({ userNo, title, content, address })
    .then(results => results)
    .catch(err => err);

  res.json('ok');
});

router.get('/find-id', async (req, res) => {
  console.log('tq');
  const { realName, email } = req.param;
  const result = await findService.findId({ realName, email })
    .then(results => results)
    .catch(err => err);
  if (result) {
    res.send(result[0]);
  } else {
    res.send(false);
  }
});

router.get('/post/news-list/:localName', async (req, res) => {
  const { localNo } = req.param;
  let moreContents = 0
  const result = await postService.previewNewsList({ localNo, moreContents })
    .then(results => results)
    .catch(err => err);
  if (result.length > 15) { // 지역의 게시물의 개수가 15개 이상이면 더 불러오기
    moreContents += 1;
  }
  res.json(result);
});
module.exports = router;
