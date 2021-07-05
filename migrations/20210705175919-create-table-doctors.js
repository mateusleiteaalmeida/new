'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const Doctors = await queryInterface.createTable("Doctors", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      fullName: {
        allowNull: false,
        type: Sequelize.STRING
      },
      CRM: {
        allowNull: false,
        type: Sequelize.INTEGER
      }
    });
    return Doctors;
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Doctors");
  }
};
