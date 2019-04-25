const express = require('express');
const joinService = require('../service/join');
const loginService = require('../service/login');
const findService = require('../service/find');
const PostOffice = require('./../mail-config/mail-password');
const rn = require('random-number');
const secret = require('../secret/index');
const uuid = require('uuid/v4');
const key = 'keyValue';

let mapper = {};
const rnConfig = {
  min: 111111,
  max: 999999,
  integer: true,
};

const router = express.Router();

/**
 * 회원가입
 *
 */
router.post('/join', async (req, res) => {
  const result = await joinService.insertUser({
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
  const { session } = req;
  if (mapper[session.key]) {
    res.json({
      data: mapper[session.key],
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
    .then(result => (result.length ? secret.checkHashword(result[0].password, password) : false))
    .catch(err => err);

  if (correct) {
    const results = await loginService.getUserDataByNickname({ nickName })
      .then(result => ({
        userId: result[0].userId,
        realName: secret.decrypt(result[0].realName, key),
        nickname: result[0].nickName,
        email: secret.decrypt(result[0].email, key),
        avatar: result[0].avatar,
        description: result[0].description,
      }))
      .catch(err => err);

    if (results) {
      const key = uuid();
      req.session.key = key;
      mapper[key] = results;
    }

    res.json({
      data: results,
      loginStatus: true,
    });


  } else {
    res.json({
      data: {},
      loginStatus: false,
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
  if (!realName && !nickName && !email) {
    res.json(false);
  }
  // 암호화된 정보 전달
  const encryptedRealName = secret.encrypt(realName, key);
  const encryptedEmail = secret.encrypt(email, key);
  const result = await findService.findPassword({
    realName: encryptedRealName,
    nickName,
    email: encryptedEmail,
  })
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
  const tmpPassword = rn(rnConfig);
  const encryptedEmail = secret.encrypt(email, key);
  const saltedPassword = secret.salting(tmpPassword);

  const result = await findService.insertTmpPassword({
    email: encryptedEmail,
    tmpPassword: saltedPassword,
  })
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

