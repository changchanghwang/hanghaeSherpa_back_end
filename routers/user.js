const express = require('express');
const router = express.Router();
const { User } = require('../models');
const bcrypt = require('bcrypt');
const {
  idValidation,
  passwordValidation,
} = require('./controller/signupValidation');
const saltRounds = 10;
const { signUpSchema, idCheckSchema, nicknameSchema } = require('./joi');
const { idCheck, nicknameCheck } = require('./controller/Checks');
const { signup } = require('../services/signup');

//회원가입
router.post('/signup', signup);

//id중복체크
router.post('/signup/idCheck', idCheck);

//닉네임 중복체크
router.post('/signup/nickCheck', nicknameCheck);

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
  const token = jwt.sign({ userId: user.userId }, process.env.SECRET_KEY);
  console.log(token);
  res.cookie('user', token, {
    maxAge: 50 * 60 * 1000,
    httpOnly: true,
  });
  res.status(200).json({});
});

module.exports = router;
