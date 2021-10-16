const express = require('express');
const router = express.Router();
const { Todo } = require('../models');
const loginAuth = require('../middleWares/loginAuth');
const moment = require('moment');
const { mainView } = require('../services/mainView');

router.get('/view/:date', loginAuth, mainView);

router.post('/post/:date', loginAuth, async (req, res, next) => {
//loginAuth 인증을 거친 해당 user값에 담음
  const user = res.locals.user;
//parameter로 받은 날짜를 date에 담음
  const { date } = req.params;
  console.log(date);
//현재 날짜를 todayDate에 담음
  const todayDate = moment().format('YYYY-MM-DD');
//전달받은 date와 현재 날짜인 todayDate 다른 경우 status(400)과 함께 msg 전송
  if (date !== todayDate) {
    return res.status(400).json({
      msg: '현재 날짜와 다른 경우 등록할 수 없습니다.',
    });
  }
//body로 전달받은 값을 담음
  const { perfection, creativity, difficulty, concentration, satisfaction } =
    req.body;
  try {
//전달받은 데이터 토대로 Todo 모델에서 user와 date 같은 값아 existUser에 담음
    const existUser = await Todo.findOne({ where: { user, date } });
//기존에 저장된 값이 없다면 Todo 모델에 새로운 값 넣고 status(200) 전송
    if (!existUser) {
      await Todo.create({
        user,
        date,
        perfection,
        creativity,
        difficulty,
        concentration,
        satisfaction,
      });
      res.status(200).json({});
      return;
//그렇지 않은 경우는 새로운 데이터로 update 후 status(200) 전송
    } else {
      await Todo.update(
        {
          user,
          date,
          perfection,
          creativity,
          difficulty,
          concentration,
          satisfaction,
        },
        { where: { user, date } }
      );
      res.status(200).json({});
      return;
    }
//error발생 시 error처리 미들웨어로 이동
  } catch (err) {
    next(err);
  }
});

module.exports = router;
