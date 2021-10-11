const express = require('express');
const router = express.Router();
const { users } = require('../models');

router.post('/signup', async (req, res, next) => {
  const { nickname, userId, password, passwordCheck } = req.body;
  const userExist = await users.findOne({
    where: {
      userId,
      password,
    },
  });
  if (!userExist) {
    await users.create({ nickname, userId, password });
    res.status(200).json({});
  } else {
    res.status(400).json({});
  }
});

module.exports = router;
