const express = require('express');

const router = express.Router();

router.get('/members', (req, res) => {
  const members = [
    {
      id: 1,
      name: 'heecheol',
    },
    {
      id: 2,
      name: 'hoocheol',
    },
  ];

  res.json(members);
});

module.exports = router;
