const express = require('express');
const router = express.Router();
const { Todo } = require('../models');
const loginAuth = require('../middleWares/loginAuth');

router.use('/view/:date', async (req, res, next) => {
  const { date } = req.params;
  const todo = await Todo.findOne({
    where: {
      date,
    },
  });
  res.status(200).json({ todo });
});

router.post('/post', loginAuth, async (req, res) => {
  const user = res.locals.user;
  const { date } = req.params;
  const { perfection, creativity, difficulty, concentration, satisfacation } =
    req.body;
  await Posts.create({
    user,
    date,
    perfection,
    creativity,
    difficulty,
    concentration,
    satisfacation,
  });
  res.status(200).json({});
  return;
});

module.exports = router;
