'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const Specialities = await queryInterface.createTable('Specialties', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING
      }
    });
    return Specialities;
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Specialties');
  }
};
