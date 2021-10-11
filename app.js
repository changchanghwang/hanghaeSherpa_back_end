const express = require('express')
const app = express();
const Http = require('http');
const http = Http.createServer(app);
const cookieParser = require('cookie-parser');

const router = require('./routers/index');

//parser
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use(express.static('public'));

app.use('/', router)

module.exports = http;
