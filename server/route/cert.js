const express = require('express');
const tokenBuilder = require('uuid/v4');
const nodemailer = require('nodemailer');

const router = express.Router();

const container = [
  {
    email: 'msn1877@naver.com',
    token: 'weiofjw',
  },
];

router.post('/mail', (req, res) => {
  const requestEmail = req.body.email;
  const token = tokenBuilder(); // 토큰생성
  let existUser = false; // 유저가 존재하는지 여부

  // container 돌면서 일치하는 email 이 있는지 확인하고 있으면 토큰을 덮어씌워줌
  container.forEach((tempUser) => {
    if (tempUser.email === requestEmail) {
      existUser = true;
      tempUser.token = token;
    }
  });

  // 만약에 유저가 없으면 새로 생성
  if (!existUser) {
    container.push({
      email: requestEmail,
      token,
    });
  }

  // 이메일 보내기
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
      address: requestEmail,
    },
    subject: '안녕하세요 누리다입니다. 이메일 인증을 해주세요',
    html: `<p>안녕하세요 누리다입니다. 인증 코드는 다음과 같습니다.</p>
            <p>${token}</p>`,
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.error(err);
    } else {
      console.log(`Email sent ${info.response}`);
    }
  });
  console.log('sending mail token is', token);
});

router.get('/compare/:email/:token', (req, res) => {
  const inputEmail = req.params.email;
  const inputToken = req.params.token;

  // 테이블에서 요청된 이메일과 같은 row 가 selectedUser 가 됨
  const selectedUser = container.find(tempUser => tempUser.email === inputEmail);
  // 그 유저의 토큰과 요청된 토큰이 같으면 same, 아니면 diff
  if (selectedUser.token === inputToken) {
    console.log('same');
    res.send('same');
  } else {
    console.log('diff');
    res.send('diff');
  }
});

module.exports = router;
