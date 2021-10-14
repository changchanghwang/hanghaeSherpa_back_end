const express = require('express');
const router = express.Router();
const { Todo } = require('../models');
const loginAuth = require('../middleWares/loginAuth');
const moment = require('moment');
const { mainView } = require('../services/mainView');

router.get('/view/:date', loginAuth, mainView);

router.post('/post', loginAuth, async (req, res, next) => {
  const user = res.locals.user;
  const date = moment().format('YYYY-MM-DD');
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
