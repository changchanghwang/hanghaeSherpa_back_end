const express = require('express');
const router = express.Router();
const moment = require('moment');
const loginAuth = require('../middleWares/loginAuth');
const Todo = require('../models/todos');

router.get('/view', loginAuth, async (req, res, next) => {
  //항상 오늘날짜를 기준으로
  const today = moment().format('YYYY-MM-DD');
  //로그인 인증을 통해 해당유저를 찾음
  const user = res.locals.user;
  //일주일치 날짜를 뽑는 로직
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

  //일주일치 데이터를 찾아봄
  const todosM0 = await Todo.findOne({ where: { date: today, user } });
  const todosM1 = await Todo.findOne({ where: { date: dayM1, user } });
  const todosM2 = await Todo.findOne({ where: { date: dayM2, user } });
  const todosM3 = await Todo.findOne({ where: { date: dayM3, user } });
  const todosM4 = await Todo.findOne({ where: { date: dayM4, user } });
  const todosM5 = await Todo.findOne({ where: { date: dayM5, user } });
  const todosM6 = await Todo.findOne({ where: { date: dayM6, user } });

  //일주일치 데이터중 아무것도 없을때
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

  //데이터 정제 로직
  const todoArr = [
    todosM0,
    todosM1,
    todosM2,
    todosM3,
    todosM4,
    todosM5,
    todosM6,
  ];
  const weekTodoArr = [];
  //없는 데이터를 빼주고 있는데이터는 가공해서 새로운 배열에 push
  todoArr.filter((val, idx) => {
    if (todoArr[idx] !== null) {
      return weekTodoArr.push({
        id: todoArr[idx].date,
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
  //몇개인지?
  const weekTodoNum = weekTodoArr.length;
  res.status(200).json({ weekTodoArr, weekTodoNum });
});

module.exports = router;
