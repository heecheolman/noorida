const express = require('express');
const changePasswordService = require('../service/changePassword');

const router = express.Router();

router.post('', async (req, res) => {
  const { userId, oldPassword } = req.body;
  const result = await changePasswordService.checkPassword({ userId, oldPassword })
    .then(results => results)
    .catch(err => err);
  if (result.length !== 0) {
    res.json(true);
  } else {
    res.json(false);
  }
});


router.put('', async (req, res) => {
  const { userId, newPassword } = req.body;
  const result = await changePasswordService.insertNewPassword({ userId, newPassword })
    .then(results => results)
    .catch(err => err);
  res.json(result[0]);
});

module.exports = router;
