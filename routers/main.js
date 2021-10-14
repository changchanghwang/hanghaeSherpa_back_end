const express = require('express');
const router = express.Router();
const { Todo } = require('../models');
const loginAuth = require('../middleWares/loginAuth');
const moment = require('moment');
const { mainView } = require('../services/mainView');

router.get('/view/:date', loginAuth, mainView);

router.post('/post/:date', loginAuth, async (req, res, next) => {
  const user = res.locals.user;
  const { date } = req.params;
  console.log(date);
  const todayDate = moment().format('YYYY-MM-DD');
  if (date !== todayDate) {
    return res.status(400).json({
      msg: '현재 날짜와 다른 경우 등록할 수 없습니다.',
    });
  }
  const { perfection, creativity, difficulty, concentration, satisfaction } =
    req.body;
  try {
    const existUser = await Todo.findOne({ where: { user, date } });
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
  } catch (err) {
    next(err);
  }
});

module.exports = router;
