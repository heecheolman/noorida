const express = require('express');
const joinService = require('../service/join');
const loginService = require('../service/login');

const router = express.Router();

router.post('/join', async (req, res) => {
  const result = await joinService.insertUser({
    realName: req.body.realName,
    nickName: req.body.nickName,
    password: req.body.password,
    email: req.body.email })
    .then(results => results)
    .catch(error => error);
  if (result) {
    res.sendStatus(200);
  } else {
    res.sendStatus(500);
  }
});

router.post('/login', async (req, res) => {
  const result = await loginService.login({
    nickName: req.body.nickName,
    password: req.body.password,
  })
    .then(results => results)
    .catch(err => err);

  if (result.length === 1) {
    res.json(result[0]);
  } else {
    res.send(false);
  }
});


module.exports = router;
