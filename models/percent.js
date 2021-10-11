'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Percent extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Percent.hasMany(models.User, {
        foreignKey: 'user',
      });
      Percent.hasMany(models.Todo, {
        foreignKey: 'todo',
      });
    }
  }
  Percent.init(
    {
      totalPercent: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Percent',
    }
  );
  return Percent;
};
