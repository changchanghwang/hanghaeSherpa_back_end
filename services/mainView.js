const Todo = require('../models/todos');

exports.mainView = async (req, res, next) => {
  const date = req.params;
  console.log(date);
  const days = date.split('-');
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
      date: yesterday,
      user,
    },
  });
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
};
