'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("Doctors", [
      {
        fullName: "John Doe",
        CRM: 1212 
      },
      {
        fullName: "Jane Doe",
        CRM: 1313
      }
    ])
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Doctors", null, {})
  }
};
