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

router.post('/send-mail', (req, res) => {
  const email = req.body.email;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'heecheol.bot@gmail.com',
      pass: 'gmlcjf12',
    },
  });

  const mailOptions = {
    from: 'heecheol.bot@gmail.com',
    to: email,
    subject: '안녕하세요 누리다입니다.',
    html: `<p>안녕하세요 누리다입니다. 아래의 링크를 클릭해주세요.</p>
            <a href="http://localhost:3000/api/auth/?email=$${email}&token=abcdefg">인증하기</a>`,
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
  } else {
    console.log('join failed');
  }

  res.send('ok');
});

module.exports = router;
