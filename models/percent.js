'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class percent extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      percent.hasMany(models.users,{
        foreignKey:"user",
      });
      percent.hasMany(models.todos,{
        foreignKey:"todo",
      })
    }
  };
  percent.init({
    totalPercent: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'percent',
  });
  return percent;
};