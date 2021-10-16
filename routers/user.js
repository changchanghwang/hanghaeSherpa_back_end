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
//body로 userId, password 를 전달 받아 벨리데이션 거침 
  const { userId, password } = await postLoginSchema.validateAsync(req.body);
//User 모델에서 전달받은 데이터와 같은 userId를 찾아 user에 담음
  const user = await User.findOne({
    where: { userId },
  });
//user의 password를 비교하여 다른 값이면 status(400)을 return 
  if (!bcrypt.compare(password, user.password)) {
    return res.status(400).send({});
//SECRET_KEY로 인증된 JWT 토근을 token에 담아 status(200)과 함께 json형태로 전송
  } else {
    const token = jwt.sign({ userId }, process.env.SECRET_KEY);
    const nickname = user.nickname;
    res.status(200).json({ nickname, token });
  }
});

module.exports = router;
