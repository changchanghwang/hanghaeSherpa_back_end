const express = require('express');
const router = express.Router();
const { Todo } = require('../models');
const loginAuth = require('../middleWares/loginAuth');
const moment = require('moment');

router.get('/view', loginAuth, async (req, res, next) => {
  // const { date } = req.params; //2021-10-13
  // const days = date.split('-');
  // const day = Number(days['2']) - 1;
  // const yesterday = `${days[0]}-${days[1]}-${day}`;
  const user = res.locals.user;
  const date = '2021-10-14';
  const yesterday = '2021-10-13';
  const todos = await Todo.findOne({
    where: {
      date,
      user,
    },
  });
  console.log(todos);
  const yesterdayTodos = await Todo.findOne({
    where: {
      date: yesterday,
      user,
    },
  });
  console.log(yesterdayTodos);
  const todo = {
    id: todos.user,
    date: todos.date,
    data: [
      {
        x: '완성도',
        y: todos.perfection,
      },
      {
        x: '창의성',
        y: todos.creativity,
      },
      {
        x: '난이도',
        y: todos.difficulty,
      },
      {
        x: '집중도',
        y: todos.concentration,
      },
      {
        x: '만족도',
        y: todos.satisfaction,
      },
    ],
  };
  const yesterdayTodo = {
    id: yesterdayTodos.user,
    date: yesterdayTodos.date,
    data: [
      {
        x: '완성도',
        y: yesterdayTodos.perfection,
      },
      {
        x: '창의성',
        y: yesterdayTodos.creativity,
      },
      {
        x: '난이도',
        y: yesterdayTodos.difficulty,
      },
      {
        x: '집중도',
        y: yesterdayTodos.concentration,
      },
      {
        x: '만족도',
        y: yesterdayTodos.satisfaction,
      },
    ],
  };
  console.log(todo, yesterdayTodo);
  res.status(200).json({ todo, yesterdayTodo });
});

router.post('/post', loginAuth, async (req, res) => {
  const user = res.locals.user;
  const date = moment().format('YYYY-MM-DD');
  const { perfection, creativity, difficulty, concentration, satisfacation } =
    req.body;
  const existUser = await Todo.findOne({ where: { user, date } });
  if (!existUser) {
    await Todo.create({
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
  } else {
    await Todo.update({
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
  }
});

module.exports = router;
