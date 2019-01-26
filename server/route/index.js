const express = require('express');
const nodemailer = require('nodemailer');
const joinService = require('../service/join');
const tokenBuilder = require('../util/token-builder');

const router = express.Router();


router.post('/user', async (req, res) => {
  // 회원가입
  const token = tokenBuilder(); // 토큰 생성

  const result = await joinService.insertUser({
    nickname: req.body.nickname,
    password: req.body.password,
    email: req.body.email,
    token,
  });

  if (result) {
    res.sendStatus(200);
    res.send('ok');
  } else {
    res.sendStatus(500);
  }
  // 1. 회원가입
  // 2. 토큰도 같이 insert

  // 이메일 보내는 로직
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'heecheol.bot@gmail.com',
      pass: 'gmlcjf12',
    },
  });

  const mailOptions = {
    from: {
      name: '누리다',
      address: 'heecheol.bot@gmail.com',
    },
    to: {
      address: req.body.email,
    },
    subject: '안녕하세요 누리다입니다. 이메일 인증을 해주세요',
    html: `<p>안녕하세요 누리다입니다. 인증 코드는 다음과 같습니다.</p>
            <a href="http://localhost:3000/api/auth/?email=$${req.body.email}&token=${token}">인증하기</a>`,
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.error(err);
    } else {
      console.log(`Email sent ${info.response}`);
    }
  });
});


router.get('/auth', (req, res) => {
  console.log('auth get');
  const email = req.query.email;
  const token = req.query.token;

  console.log('email is', email);
  console.log('token is', token);


  if (joinService.compareToken()) {
    // success
  } else {
    // failed
  }

  if (token === 'abcdefg') {
    console.log('join success');
    // active true
  } else {
    console.log('join failed');
    // active false
  }
  res.send('ok');
});

module.exports = router;
