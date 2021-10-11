'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('percent', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user:{
        type:Sequelize.INTEGER,
        allowNull: false,
        ondDelte:'CASCADE',
        references:{
          model: "users",
          key: "id",
        }
      },
      todo:{
        type:Sequelize.INTEGER,
        allowNull: false,
        ondDelte:'CASCADE',
        references:{
          model: "users",
          key: "id",
        }
      },
      totalPercent: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('percents');
  }
};