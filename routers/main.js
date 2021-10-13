const express = require('express');
const router = express.Router();
const { Todo } = require('../models');
const loginAuth = require('../middleWares/loginAuth');

router.get('/view/:date', loginAuth, async (req, res, next) => {
  const { date } = req.params; //2021-10-13
  const days = date.slice('-');
  const day = Number(days['2']) - 1;
  const yesterday = `${days[0]}-${days[1]}-${day}`;
  const user = res.locals.user;
  const todos = await Todo.findOne({
    where: {
      date,
      user,
    },
  });
  const yesterdayTodos = await Todo.findOne({
    where: {
      yesterday,
      user,
    },
  });
  const todo = {
    id: todos.userId,
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
    id: yesterdayTodo.userId,
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

  res.status(200).json({ todo, yesterdayTodo });
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
