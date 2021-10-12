const express = require('express');
const router = express.Router();
const { Todo } = require('../models');
const loginAuth = require('../middleWares/loginAuth');

router.get('/view/:date', loginAuth, async (req, res, next) => {
  const { date } = req.params;
  const userId = res.locals.user;
  const todo = await Todo.findOne({
    where: {
      date,
      userId,
    },
  });
  res.status(200).json({ todo });
});

module.exports = router;
