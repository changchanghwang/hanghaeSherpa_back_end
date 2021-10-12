const express = require('express');
const router = express.Router();
const mainRouter = require('./main');
const userRouter = require('./user');

router.use('/mainpage', mainRouter);
router.use('/user', userRouter);

module.exports = router;
