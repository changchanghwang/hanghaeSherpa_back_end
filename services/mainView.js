const { Todo, User } = require('../models');

exports.mainView = async (req, res, next) => {
  //파라미터로 날짜를 받음
  const { date } = req.params;
  //어제날짜 만드는 로직
  const days = date.split('-');
  const day = String(Number(days['2']) - 1);
  const yesterday = `${days[0]}-${days[1]}-${day}`;
  //미들웨어에서 userId를 받음
  const user = res.locals.user;
  const users = await User.findOne({ where: { id: user } });
  const signupDate = users.date;
  //받은 userId와 날짜로 해당유저의 그 날짜todo 데이터를 찾음
  const todos = await Todo.findOne({
    where: {
      date,
      user,
    },
  });
  //받은 userId와 날짜로 해당유저의 그 날짜 전날의 todo 데이터를 찾음
  const yesterdayTodos = await Todo.findOne({
    where: {
      date: yesterday,
      user,
    },
  });
  //해당날짜, 그 전날 데이터가 있을때
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
    return res.status(200).json({ todo, yesterdayTodo, signupDate });
  }
  //해당날짜, 그 전날 데이터가 없을때
  else if (!todos && !yesterdayTodos) {
    const todo = {
      id: user,
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
      id: users.id,
      date: yesterday,
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
    return res.status(200).json({
      todo,
      yesterdayTodo,
      msg: '데이터가 없습니다.',
      signupDate,
    });
  }
  //그 전날 데이터가 없을때 전날데이터는 더미데이터로
  else if (!yesterdayTodos) {
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
    const [Year, Month, days] = todos.date.split('-');
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
    return res.status(200).json({ todo, yesterdayTodo, signupDate });
  }
  //그 해당날짜 데이터가 없을때 해당날짜데이터는 더미데이터로
  else if (!todos) {
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
    return res.status(200).json({ todo, yesterdayTodo, signupDate });
  }
};
