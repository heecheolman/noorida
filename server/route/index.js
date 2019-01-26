const express = require('express');
const nodemailer = require('nodemailer');
const joinService = require('../service/join');

const router = express.Router();

router.post('/user', async (req, res) => {
  const result = await joinService.insertUser({
    nickname: req.body.nickname,
    password: req.body.password,
    email: req.body.email,
  });
});

module.exports = router;
