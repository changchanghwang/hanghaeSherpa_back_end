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
  const month = today.getMonth() + 1;
  const day = today.getDate();
  const date = `${year}-${month}-${day}`;
  if (
    idValidation(userId) &&
    passwordValidation(userId, password, passwordCheck)
  ) {
    const encryptedPassword = await bcrypt.hash(password, saltRounds);
    const userExist = await User.findOne({
      where: {
        userId,
        password: encryptedPassword,
      },
    });
    try {
      if (!userExist) {
        await User.create({
          nickname,
          userId,
          password: encryptedPassword,
          date,
        });
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

//중복체크
router.post('/signup/dup', async (req, res, next) => {
  const { userId } = req.body;
  const userExist = await User.findOne({
    where: {
      userId,
    },
  });
  try {
    if (!userExist) {
      res.status(200).json({});
    } else {
      res.status(400).json({});
    }
  } catch (err) {
    console.error(err);
  }
});

//로그인
router.post('/login', async (req, res) => {
  const { userId, password } = await postLoginSchema.validateAsync(req.body);
  const user = await User.findOne({
    where: { userId, password },
  });
  if (!user) {
    res.status(400).send({});
    return;
  }
  const token = jwt.sign({ userId }, process.env.SECRET_KEY);
  console.log(token);
  res.cookie('user', token, {
    maxAge: 50 * 60 * 1000,
    httpOnly: true,
  });
  res.status(200).json({ nickname });
});

module.exports = router;
