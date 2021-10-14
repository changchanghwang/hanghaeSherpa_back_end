const { idCheckSchema, nicknameSchema } = require('../joi');
const User = require('../../models/users');

module.exports = {
  //아이디 중복체크
  idCheck: async (req, res, next) => {
    const { userId } = await idCheckSchema.validateAsync(req.body);
    try {
      const userExist = await User.findOne({
        where: {
          userId,
        },
      });
      if (!userExist) {
        res.status(200).json({});
      } else {
        res.status(400).json({ errorMessage: '중복아이디입니다.' });
      }
    } catch (err) {
      console.error(err);
      next(err);
    }
  },
  //닉네임 중복체크
  nicknameCheck: async (req, res, next) => {
    const { nickname } = nicknameSchema.validateAsync(req.body);
    try {
      const userExist = await User.findOne({
        where: {
          nickname,
        },
      });
      if (!userExist) {
        res.status(200).json({});
      } else {
        res.status(400).json({ errorMessage: '중복닉네임입니다.' });
      }
    } catch (err) {
      console.error(err);
      next(err);
    }
  },
};
