const express = require('express');
const joinService = require('../service/join');
const loginService = require('../service/login');
const findService = require('../service/find');
const PostOffice = require('./../mail-config/mail-password');
const tokenBuilder = require('uuid/v4');
const secret = require('../secret/index');
const uuid = require('uuid/v4');
const key = 'thisiskdkdk';

let mapper = {};


const router = express.Router();

/**
 * 회원가입
 */
router.post('/join', async (req, res) => {
  const result = await joinService.insertUser(  {
    realName: secret.encrypt(req.body.realName, key),
    nickName: req.body.nickName,
    password: secret.salting(req.body.password),
    email: secret.encrypt(req.body.email, key),
  })
    .then(results => results)
    .catch(err => err);
  if (result) {
    res.sendStatus(200);
  } else {
    res.sendStatus(500);
  }
});


/**
 * 로그인
 */

router.get('/login', async (req, res) => {
  console.log(0);
  const { session } = req;
  console.log(1);
  if (mapper[session.key]) {
    const { nickName } = mapper[session.key];
    console.log(3);
    const result = await loginService.getUserDataByNickname({ nickName })
      .then((results) => {
        return {
          userId: results[0].userId,
          realName: secret.decrypt(result[0].realName, key),
          nickname: result[0].nickname,
          email: secret.decrypt(result[0].email, key),
          avatar: result[0].avatar,
          description: result[0].description,
        };
      })
      .catch(err => err);
    console.log(result);
    res.json({
      data: result,
      loginStatus: true,
    });
  } else {
    res.json({
      data: {},
      loginStatus: false,
    });
  }
});

router.delete('/login', async (req, res) => {
  const { session } = req;
  delete mapper[session.key];
  res.json('ok');
});

router.post('/login', async (req, res) => {
  const { nickName, password } = req.body;

  const correct = await loginService.getPasswordByNickname({ nickName })
    .then(result => secret.checkHashword(result[0].password, password))
    .catch(err => err);

  if ( correct ) {
    console.log('로그인 성공!')
    const result = await loginService.getUserDataByNickname({ nickName })
      .then((results) => {
        return {
          userId: results[0].userId,
          realName: secret.decrypt(result[0].realName, key),
          nickname: result[0].nickname,
          email: secret.decrypt(result[0].email, key),
          avatar: result[0].avatar,
          description: result[0].description,
        };
      })
      .catch(err => err);

    if (result) {
      const key = uuid();
      req.session.key = key;
      mapper[key] = { nickName };
    }

    res.json({
      data: result,
      loginStatus: !!result,
    });
  }
});



router.post('/find-id', async (req, res) => {
  const { realName, email } = req.body;
  const result = await findService.findId({ realName, email })
    .then(results => results)
    .catch(err => err);

  if (result.length !== 0) {
    res.json(result[0]);
  } else {
    res.json(false);
  }
});

router.post('/find-password', async (req, res) => {
  const { realName, nickName, email } = req.body;
  const result = await findService.findPassword({ realName, nickName, email })
    .then(results => results)
    .catch(err => err);

  if (result.length !== 0) {
    res.json(result[0]);
  } else {
    res.json(false);
  }
});

router.put('/find-password', async (req, res) => {
  const email = req.body.email;
  const tmpPassword = tokenBuilder();

  const result = await findService.insertTmpPassword({ email, tmpPassword })
    .then(results => results)
    .catch(err => err);

  PostOffice.transporter.sendMail(
    PostOffice.mailOptionBuilder(email, tmpPassword), (err, info) => {
      if (err) {
        console.error(err);
        res.sendStatus(500);
      } else {
        console.log(`EMAIL SENT ${info.response}`);
        res.sendStatus(200);
      }
    });
});

module.exports = router;

