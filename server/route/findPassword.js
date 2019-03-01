const express = require('express');
const tokenBuilder = require('uuid/v4');
const PostOffice = require('./../mail-config/mail-password');
const findPasswordService = require('./../service/findPassword');

const router = express.Router();

router.post('/mail', async (req, res) => {
  const requestEmail = req.body.email;
  const tokenPw = tokenBuilder();
  await findPasswordService.findPassword({ email: requestEmail, password : tokenPw})
    .then(results => results)
    .catch(error => error);

  PostOffice.transporter.sendMail(
    PostOffice.mailOptionBuilder(requestEmail, tokenPw),
      (err, info) => {
        if (err) {
          console.error(err);
          res.sendStatus(500);
          } else {
              console.log(`EMAIL SENT ${info.response}`);
              res.sendStatus(200);
          }
      }
  )
});
module.exports = router;