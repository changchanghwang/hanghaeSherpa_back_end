const express = require('express');
const router = express.Router();
const { users } = require('../models');
const bcrypt = requrie('bcrypt');
const {
  idValidation,
  passwordValidation,
} = require('./controller/signupValidation');
const saltRounds = 10;

router.post('/signup', async (req, res, next) => {
  const { nickname, userId, password, passwordCheck } = req.body;
  if (
    idValidation(userId) &&
    passwordValidation(userId, password, passwordCheck)
  ) {
    const encryptedPassword = bcrypt.hash(password, saltRounds);
    const userExist = await users.findOne({
      where: {
        userId,
        password: encryptedPassword,
      },
    });
    try {
      if (!userExist) {
        await users.create({ nickname, userId, password: encryptedPassword });
        res.status(200).json({});
      } else if (userExist) {
        res.status(400).json({
          errorMessage: '중복아이디입니다.',
        });
      }
    } catch (err) {
      console.error(err);
    }
  } else {
    res.status(400).json({
      errorMessage: 'validation Error',
    });
  }
});

module.exports = router;
