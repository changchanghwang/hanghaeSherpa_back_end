const { signUpSchema } = require('../routers/joi');

module.exports = {
  signup: async (req, res, next) => {
    const { nickname, userId, password, passwordCheck } =
      await signUpSchema.validateAsync(req.body);
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
  },
};
