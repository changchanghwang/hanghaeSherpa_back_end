const express = require('express');
const app = express();
const Http = require('http');
const http = Http.createServer(app);
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const { sequelize } = require('./models/index');
const cors = require('cors');

//sequelize 초기화
sequelize
  .sync({ force: false })
  .then(() => console.log('데이터베이스 연결 성공!'))
  .catch((err) => console.error(err));

//morgan
app.use(morgan('dev'));
//cors
app.use(cors());

//routing
const router = require('./routers/index');

//parser
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
// app.use(express.static('public'));

//routing
app.use('/', router);

module.exports = http;
