const { idCheckSchema } = require('../joi');

module.exports = {
  //아이디 중복체크
  idCheck: async (req, res, next) => {
    const { userId } = await idCheckSchema.validateAsync(req.body);
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
  },
  //닉네임 중복체크
  nicknameCheck: async (req, res, next) => {
    const { nickname } = nicknameSchema.validateAsync(req.body);
    const userExist = await User.findOne({
      where: {
        nickname,
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
  },
};
