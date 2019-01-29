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

module.exports = router;
