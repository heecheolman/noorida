const express = require('express');
const tokenBuilder = require('uuid/v4');
const PostOffice = require('./../mail-config/mail-config');
const certService = require('./../service/cert');

const router = express.Router();

const container = [
  {
    email: 'msn1877@naver.com',
    token: 'weiofjw',
  },
];

router.post('/mail', async (req, res) => {
  const requestEmail = req.body.email;
  const token = tokenBuilder(); // 토큰생성

  await certService.upsertUserToken({ tmpEmail: requestEmail, tmpToken: token })
    .catch(error => error);

  PostOffice.transporter.sendMail(PostOffice.mailOptionBuilder(requestEmail, token), PostOffice.mailErrorHandler);
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
