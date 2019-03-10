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
router.put('/:userId/description', async (req, res) => {
  const { userId } = req.params;
  const { description } = req.body;
  const result = await userService.updateUserDescription({ userId, description })
    .then(results => results)
    .catch(err => err);
  if (result) {
    res.send('ok');
  } else {
    res.sendStatus(500);
  }
});

module.exports = router;
