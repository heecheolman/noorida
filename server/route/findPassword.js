const express = require('express');
const tokenBuilder = require('uuid/v4');
const PostOffice = require('./../mail-config/mail-password');
const changePasswordService = require('./../service/changePassword');

const router = express.Router();

router.post('/', async (req, res) => {
  const requestEmail = req.body.email;
  const changePw = tokenBuilder();
  await changePasswordService.changePassword({ email: requestEmail, password : changePw })
    .then(results => results)
    .catch(error => error);

  PostOffice.transporter.sendMail(
    PostOffice.mailOptionBuilder(requestEmail, changePw), (err, info) => {
      if (err) {
        console.error(err);
        res.sendStatus(500);
      } else {
        console.log(`EMAIL SENT ${info.response}`);
        res.sendStatus(200);
      }
    });
});

module.exports = router;
