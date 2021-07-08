'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Specialties', [
      {
        name: 'ALERGOLOGIA'
      },
      {
        name: 'ANGIOLOGIA'
      },
      {
        name: 'BUCO MAXILO'
      },
      {
        name: 'CARDIOLOGIA CLINICA'
      },
      {
        name: 'CARDIOLOGIA INFANTIL'
      },
      {
        name: 'CIRURGIA CABEÇA E PESCOCO'
      },
      {
        name: 'CIRURGIA CARDIACA'
      },
      {
        name: 'CIRURGIA DE TORAX'
      },
    ])
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Specialties', null, {})
  }
};
