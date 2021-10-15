const express = require('express');
const router = express.Router();
const { User } = require('../models');
const { idCheck, nicknameCheck } = require('./controllers/Checks');
const { signup } = require('../services/signup');
const { postLoginSchema } = require('./joi');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

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
    where: { userId },
  });
  if (!bcrypt.compare(password, user.password)) {
    return res.status(400).send({});
  } else {
    const token = jwt.sign({ userId }, process.env.SECRET_KEY);
    const nickname = user.nickname;
    res.status(200).json({ nickname, token });
  }
});

module.exports = router;
