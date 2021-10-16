const Sequelize = require('sequelize');
const User = require('./users');
const Todo = require('./todos');

const env = process.env.NODE_ENV || 'development';
const config = require('../config/config.json')[env];
const db = {};

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

db.sequelize = sequelize;
db.User = User;
db.Todo = Todo;

User.init(sequelize);
Todo.init(sequelize);

User.associate(db);
Todo.associate(db);

module.exports = db;
