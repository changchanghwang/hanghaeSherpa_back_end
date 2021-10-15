const express = require('express');
const router = express.Router();
const moment = require('moment');
const loginAuth = require('../middleWares/loginAuth');
const Todo = require('../models/todos');

router.get('/view', async (req, res, next) => {
  const today = moment().format('YYYY-MM-DD');
  const user = '4';
  const [year, month, days] = today.split('-');
  const day = [];
  for (let i = 0; i < 7; i++) {
    const dayMinus = String(Number(days) - i);
    day.push(dayMinus);
  }
  const dayM1 = `${year}-${month}-${day[1]}`;
  const dayM2 = `${year}-${month}-${day[2]}`;
  const dayM3 = `${year}-${month}-${day[3]}`;
  const dayM4 = `${year}-${month}-${day[4]}`;
  const dayM5 = `${year}-${month}-${day[5]}`;
  const dayM6 = `${year}-${month}-${day[6]}`;

  const todosM0 = await Todo.findOne({ where: { date: today, user } });
  const todosM1 = await Todo.findOne({ where: { date: dayM1, user } });
  const todosM2 = await Todo.findOne({ where: { date: dayM2, user } });
  const todosM3 = await Todo.findOne({ where: { date: dayM3, user } });
  const todosM4 = await Todo.findOne({ where: { date: dayM4, user } });
  const todosM5 = await Todo.findOne({ where: { date: dayM5, user } });
  const todosM6 = await Todo.findOne({ where: { date: dayM6, user } });

  if (
    !todosM0 &&
    !todosM1 &&
    !todosM2 &&
    !todosM3 &&
    !todosM4 &&
    !todosM5 &&
    !todosM6
  ) {
    return res.status(400).json({});
  }

  const todoArr = [
    todosM0,
    todosM1,
    todosM2,
    todosM3,
    todosM4,
    todosM5,
    todosM6,
  ];
  const weakTodoArr = [];
  todoArr.filter((val, idx) => {
    if (todoArr[idx] !== null) {
      return weakTodoArr.push({
        id: todoArr[idx].user,
        date: todoArr[idx].date,
        data: [
          {
            x: '완성도',
            y: todoArr[idx].perfection,
          },
          {
            x: '창의성',
            y: todoArr[idx].creativity,
          },
          {
            x: '난이도',
            y: todoArr[idx].difficulty,
          },
          {
            x: '집중도',
            y: todoArr[idx].concentration,
          },
          {
            x: '만족도',
            y: todoArr[idx].satisfaction,
          },
        ],
      });
    }
  });

  res.status(200).json({ weakTodoArr });
});

module.exports = router;
