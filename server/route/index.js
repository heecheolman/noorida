const express = require('express');
const nodemailer = require('nodemailer');

const router = express.Router();

router.get('/members', (req, res) => {
  const members = [
    { id: 1, name: 'heecheol' },
    { id: 2, name: 'hoocheol' },
  ];
  res.json(members);
});

router.post('/user', (req, res) => {
  // 1. 회원가입
  // 2. 토큰도 같이 insert
});

router.post('/cert-email', (req, res) => {
  const email = req.body.email;
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
      address: email,
    },
    subject: '안녕하세요 누리다입니다. 이메일 인증을 해주세요',
    html: `<p>안녕하세요 누리다입니다. 인증 코드는 다음과 같습니다.</p>
            <a href="http://localhost:3000/api/auth/?email=$${email}&token=${token}">인증하기</a>`,
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.error(err);
    } else {
      console.log(`Email sent ${info.response}`);
    }
  });

  res.send('ok');
});

router.get('/auth', (req, res) => {
  console.log('auth get');
  const email = req.query.email;
  const token = req.query.token;

  console.log('email is', email);
  console.log('token is', token);

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
