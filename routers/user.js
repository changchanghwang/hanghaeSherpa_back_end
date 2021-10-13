const express = require('express');
const router = express.Router();
const { User } = require('../models');
const { idCheck, nicknameCheck } = require('./controllers/Checks');
const { signup } = require('../services/signup');
const { postLoginSchema } = require('./joi')

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
    return res.status(400).send({});
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
