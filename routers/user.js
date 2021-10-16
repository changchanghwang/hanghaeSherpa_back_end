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
  if (!user) {
    return res
      .status(400)
      .send({ msg: '아이디 또는 비밀번호가 정확하지 않습니다' });
  }
  const compare = await bcrypt.compare(password, user.password);
  if (!compare) {
    return res
      .status(400)
      .send({ msg: '아이디 또는 비밀번호가 정확하지 않습니다' });
    //SECRET_KEY로 인증된 JWT 토근을 token에 담아 status(200)과 함께 json형태로 전송
  } else {
    const token = jwt.sign({ userId }, process.env.SECRET_KEY);
    res.status(200).json({ token, msg: '로그인성공' });
  }
});

module.exports = router;
