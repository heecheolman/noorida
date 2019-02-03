const express = require('express');
const tokenBuilder = require('uuid/v4');
const PostOffice = require('./../mail-config/mail-config');
const certService = require('./../service/cert');

const router = express.Router();

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

router.get('/user/valid/:email/:token', async (req, res) => {
  const tmpEmail = req.params.email;
  const tmpToken = req.params.token;

  const isCertified = await certService.canCertified({ tmpEmail, tmpToken })
    .then(result => result)
    .catch(err => err);
  res.send(isCertified);
});

router.get('/user/nick-names/:nickName', async (req, res) => {
  const nickName = req.params.nickName;
  const isComparedNickname = await certService.compareNickname({ nickName })
    .then(result => result)
    .catch(err => err);
  res.send(isComparedNickname);
});

router.get('/user/emails/:email', async (req, res) => {
  const email = req.params.email;
  const isComparedEmail = await certService.compareEmail({ email })
    .then(result => result)
    .catch(err => err);
  res.send(isComparedEmail);
});

module.exports = router;
