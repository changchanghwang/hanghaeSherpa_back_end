const Sequelize = require('sequelize');

module.exports = class Todo extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        perfection: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        creativity: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        difficulty: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        concentration: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        satisfaction: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        date: {
          type: Sequelize.STRING(40),
          allowNull: false,
        },
      },
      //sequelize 옵션
      {
        sequelize,
        timestamps: false,
        underscored: false,
        modelName: 'Todo',
        tableName: 'todos',
        paranoid: false,
        charset: 'utf8',
        collate: 'utf8_general_ci',
      }
    );
  }
  static associate(db) {
    //user와 1:n 관계중 n
    db.Todo.belongsTo(db.User, {
      foreignKey: 'user',
      targetKey: 'id',
      onDelete: 'CASCADE',
    });
  }
};
