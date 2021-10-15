const express = require('express');
const router = express.Router();
const mainRouter = require('./main');
const userRouter = require('./user');
const mypageRouter = require('./mypage');

router.use('/main', mainRouter);
router.use('/user', userRouter);
router.use('/mypage', mypageRouter);

module.exports = router;
