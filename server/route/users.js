const express = require('express');
const userService = require('../service/user');

const router = express.Router();

/**
 * 특정 id 의 유저프로필카드 조회
 */
router.get('/:id/profile-card', async (req, res) => {
  const { id } = req.params;
  const result = await userService.getUserProfileCard({ id })
    .then(results => results)
    .catch(err => err);

  if (result) {
    res.json(result);
  } else {
    res.sendStatus(500);
  }
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const result = await userService.getUserInfo({ id })
    .then(results => results)
    .catch(err => err);

  if (result) {
    res.json(result);
  } else {
    res.sendStatus(500);
  }
});

module.exports = router;
