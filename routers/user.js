const express = require('express');
const router = express.Router();
const { User } = require('../models');
const bcrypt = require('bcrypt');
const {
  idValidation,
  passwordValidation,
} = require('./controller/signupValidation');
const saltRounds = 10;

router.post('/signup', async (req, res, next) => {
  const { nickname, userId, password, passwordCheck } = req.body;
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();
  const day = today.getDate();
  const date = `${year}-${month}-${day}`;
  if (
    idValidation(userId) &&
    passwordValidation(userId, password, passwordCheck)
  ) {
    const encryptedPassword = await bcrypt.hash(password, saltRounds);
    console.log(encryptedPassword);
    const userExist = await User.findOne({
      where: {
        userId,
        password: encryptedPassword,
      },
    });
    console.log('2');
    try {
      if (!userExist) {
        await User.create({
          nickname,
          userId,
          password: encryptedPassword,
          date,
        });
        console.log('3');
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
