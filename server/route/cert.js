const express = require('express');
const tokenBuilder = require('uuid/v4');
const PostOffice = require('./../mail-config/mail-config');
const certService = require('./../service/cert');

const router = express.Router();

/**
 * 인증을 위한 이메일 전송
 */
router.post('/mail', async (req, res) => {
  const requestEmail = req.body.email;
  const token = tokenBuilder();
  await certService.upsertUserToken({ tmpEmail: requestEmail, tmpToken: token })
    .then(results => results)
    .catch(error => error);

  PostOffice.transporter.sendMail(
    PostOffice.mailOptionBuilder(requestEmail, token),
    (err, info) => {
      if (err) {
        console.error(err);
        res.sendStatus(500);
      } else {
        console.log(`EMAIL SENT ${info.response}`);
        res.sendStatus(200);
      }
    },
  );
});

/**
 * 해당 이메일과 토큰정보가 일치하는지 여부
 */
router.get('/valid', async (req, res) => {
  const { email, token } = req.query;
  const isCertified = await certService.canCertified({ tmpEmail: email, tmpToken: token })
    .then(result => result)
    .catch(err => err);
  res.send(isCertified);
});

/**
 * 해당 닉네임이 사용할 수 있는지 여부
 */
router.get('/valid/nick-names', async (req, res) => {
  const { nickName } = req.query;
  const isComparedNickname = await certService.compareNickname({ nickName })
    .then(result => result)
    .catch(err => err);
  res.send(isComparedNickname);
});

/**
 * 해당 이메일을 사용할 수 있는지 여부
 */
router.get('/valid/emails', async (req, res) => {
  const { email } = req.query;
  const isComparedEmail = await certService.compareEmail({ email })
    .then(result => result)
    .catch(err => err);
  res.send(isComparedEmail);
});

module.exports = router;
