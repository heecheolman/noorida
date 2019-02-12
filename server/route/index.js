const express = require('express');
const multer = require('multer');
const joinService = require('../service/join');
const loginService = require('../service/login');

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

router.post('/post/image', upload.single('image'), (req, res) => {
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


module.exports = router;
