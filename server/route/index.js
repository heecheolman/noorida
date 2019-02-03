const express = require('express');
const joinService = require('../service/join');

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
module.exports = router;
