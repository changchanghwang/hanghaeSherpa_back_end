const express = require('express');
const router = express.Router();
const User = require('../models/users');

router.post('/signup', async (req, res, next) => {
  const { nickname, userId, password, passwordCheck } = req.body;
  const userExist = await User.findOne({
    where: {
      userId,
      password
    },
  });
  if(!userExist){

  }
});

module.exports = router;
