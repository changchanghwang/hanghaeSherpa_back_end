const express = require('express');
const router = express.Router();
const { Todo } = require('../models');

router.use('/view/:date', async (req, res, next) => {
  const { date } = req.params;
  const todo = await Todo.findOne({
    where: {
      date,
    },
  });
  res.status(200).json({ todo });
});

module.exports = router;
