const express = require('express');
const tokenBuilder = require('uuid/v4');
const PostOffice = require('./../mail-config/mail-config');
const certService = require('./../service/cert');

const router = express.Router();

router.post('/mail', async (req, res) => {
  const requestEmail = req.body.email;
  const token = tokenBuilder(); // 토큰생성

  await certService.upsertUserToken({ tmpEmail: requestEmail, tmpToken: token })
    .catch(error => error);

  PostOffice.transporter.sendMail(
    PostOffice.mailOptionBuilder(requestEmail, token),
    PostOffice.mailErrorHandler,
  );
});

router.get('/user/:email/:token', async (req, res) => {
  const tmpEmail = req.params.email;
  const tmpToken = req.params.token;

  const isCertified = await certService.canCertified({ tmpEmail, tmpToken })
    .then(result => result)
    .catch(err => err);
  res.send(isCertified);
});

router.get('/user/:nickName', async (req, res) => {
  const requestNickname = req.params.nickName;
  const isComparedNickname = await certService.compareNickname({ requestNickname })
    .then(result => result)
    .catch(err => err);
  res.send(isComparedNickname);
  console.log(isComparedNickname);
});

router.get('/user/:email', async (req, res) => {
  const requestEmail = req.params.email;
  const isComparedEmail = await certService.compareEmail({ requestEmail })
    .then(result => result)
    .catch(err => err);
  res.send(isComparedEmail);
  console.log(isComparedEmail);
});

module.exports = router;
