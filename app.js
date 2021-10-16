const express = require('express');
const app = express();
const Http = require('http');
const http = Http.createServer(app);
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const { sequelize } = require('./models/index');
const cors = require('cors');
const helmet = require('helmet');
const swaggerUi = require('swagger-ui-express')
const swaggerFile = require('./swagger_output.json')

//sequelize 초기화
sequelize
  .sync({ force: false })
  .then(() => console.log('데이터베이스 연결 성공!'))
  .catch((err) => console.error(err));

//morgan
app.use(morgan('dev'));

//cors
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

//helmet(보안)
app.use(helmet());

//routing
const router = require('./routers/index');
const { errorHandler } = require('./middleWares/errorHandler');

//parser
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
// app.use(express.static('public'));

//routing
app.use('/', router);

//errorHandler
app.use(errorHandler);

//swagger
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerFile))

module.exports = http;
