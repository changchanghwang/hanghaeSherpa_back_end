const express = require('express');
const app = express();
const Http = require('http');
const http = Http.createServer(app);
const cookieParser = require('cookie-parser');
const { sequelize } = require('./models/index');

//sequelize 초기화
sequelize
  .sync({ force: false })
  .then(() => console.log('데이터베이스 연결 성공!'))
  .catch((err) => console.error(err));

//routing
const router = require('./routers/index');

//parser
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use(express.static('public'));

//routing
app.use('/', router);

module.exports = http;
