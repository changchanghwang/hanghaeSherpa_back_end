const Sequelize = require('sequelize');

module.exports = class Percent extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        totalPercent: {
          allowNull: false,
          type: Sequelize.FLOAT,
        },
      },
      //sequelize 옵션
      {
        sequelize,
        timestamps: false,
        underscored: false,
        modelName: 'Percent',
        tableName: 'percents',
        paranoid: false,
        charset: 'utf8',
        collate: 'utf8_general_ci',
      }
    );
  }
  static associate(db) {
    //user와 1:n 관계중 n
    db.Percent.belongsTo(db.User, {
      foreignKey: 'user',
      targetKey: 'id',
      onDelete: 'CASCADE',
    });
    //todo와 1:n 관계중 n
    db.Percent.belongsTo(db.Todo, {
      foreignKey: 'todo',
      targetKey: 'id',
      onDelete: 'CASCADE',
    });
  }
};
