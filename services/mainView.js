const Todo = require('../models/todos');

exports.mainView = async (req, res, next) => {
  const { date } = req.params;
  const days = date.split('-');
  const day = String(Number(days['2']) - 1);
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
  if (todos && yesterdayTodos) {
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
    return res.status(200).json({ todo, yesterdayTodo });
  } else if (!todos && !yesterdayTodos) {
    return res.status(400).json({
      msg: '데이터가 없습니다.',
    });
  } else if (!yesterdayTodos) {
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
    const [Year, Month, days] = todos.date.split['-'];
    const yesterdate = String(Number(days) - 1);
    const dummydate = `${Year}-${Month}-${yesterdate}`;
    const yesterdayTodo = {
      id: todos.user,
      date: dummydate,
      data: [
        {
          x: '완성도',
          y: 0,
        },
        {
          x: '창의성',
          y: 0,
        },
        {
          x: '난이도',
          y: 0,
        },
        {
          x: '집중도',
          y: 0,
        },
        {
          x: '만족도',
          y: 0,
        },
      ],
    };
    return res.status(200).json({ todo, yesterdayTodo });
  } else if (!todos) {
    const todo = {
      id: yesterdayTodos.user,
      date: date,
      data: [
        {
          x: '완성도',
          y: 0,
        },
        {
          x: '창의성',
          y: 0,
        },
        {
          x: '난이도',
          y: 0,
        },
        {
          x: '집중도',
          y: 0,
        },
        {
          x: '만족도',
          y: 0,
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
    return res.status(200).json({ todo, yesterdayTodo });
  }
};
