const express = require('express');
const nodemailer = require('nodemailer');
const joinService = require('../service/join');

const router = express.Router();

router.post('/join', async (req, res) => {
  await joinService.insertUser({
    realName: req.body.realName,
    nickName: req.body.nickName,
    password: req.body.password,
    email: req.body.email })
    .catch(error => error);
});

module.exports = router;