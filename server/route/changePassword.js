const express = require('express');
const changePasswordService = require('../service/changePassword');
const loginService = require('../service/login');
const secret = require('./../secret');

const router = express.Router();

router.post('', async (req, res) => {
  const { userId, oldPassword } = req.body;
  const correct = await loginService.getPasswordByUserId({ userId })
    .then(pwData => (pwData.length ? secret.checkHashword(pwData[0].password, oldPassword) : false))
    .catch(err => err);
  res.json(correct);
});


router.put('', async (req, res) => {
  const { userId, newPassword } = req.body;
  const saltedPassword = secret.salting(newPassword);
  const result = await changePasswordService.insertNewPassword({
    userId,
    newPassword: saltedPassword,
  })
    .then(results => results)
    .catch(err => err);
  res.json(result[0]);
});

module.exports = router;
