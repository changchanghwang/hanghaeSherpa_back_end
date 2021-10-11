'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('todos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      user: {
        type: Sequelize.INTEGER,
        allowNull: false,
        //시퀄라이즈 관계설정
        ondDelte: 'CASCADE',
        references: {
          model: 'users',
          key: 'id',
        },
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
        type: Sequelize.STRING,
        allowNull: false,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('todos');
  },
};
