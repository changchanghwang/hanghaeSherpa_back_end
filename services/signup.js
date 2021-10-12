const { signUpSchema } = require('../routers/joi');

module.exports = {
  signup: async (req, res, next) => {
    //각 변수를 req.body로 받음
    const { nickname, userId, password, passwordCheck } =
      await signUpSchema.validateAsync(req.body);
    //년,월,일을 각각 구해서 원하는 모양으로 가공
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    const day = today.getDate();
    const date = `${year}-${month}-${day}`;
    //idValidation과 passwordValidation에 성공한다면 둘다 true를 반환
    if (
      idValidation(userId) &&
      passwordValidation(userId, password, passwordCheck)
    ) {
      //비밀번호 암호화
      const encryptedPassword = await bcrypt.hash(password, saltRounds);
      //user가 있는지 찾아봄
      const userExist = await User.findOne({
        where: {
          userId,
        },
      });
      try {
        //유저가 없으면
        if (!userExist) {
          //데이터베이스에 정보 입력
          await User.create({
            nickname,
            userId,
            password: encryptedPassword,
            date,
          });
          //status 200 반환
          return res.status(200).json({});
        }
        //유저가 있으면
        else {
          //400 반환
          return res.status(400).json({
            errorMessage: '중복아이디입니다.',
          });
        }
      } catch (err) {
        //에러가 발생하면, 에러핸들러로 나중에 넘길예정.
        console.error(err);
      }
    }
    //id,password Validation에 실패하면
    else {
      res.status(400).json({
        errorMessage: 'validation Error',
      });
    }
  },
};
