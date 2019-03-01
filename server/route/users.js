const express = require('express');
const userService = require('../service/user');

const router = express.Router();

/**
 * 특정 id 의 유저정보 조회
 */
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const result = await userService.getUser({ id })
    .then(results => results)
    .catch(err => err);

  if (result) {
    res.json(result);
  } else {
    res.sendStatus(500);
  }
});

module.exports = router;
