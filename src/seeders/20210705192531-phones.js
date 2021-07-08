'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Phones', [
      {
        type: 'Telefone',
        ddd: '31',
        number: '31231234',
        doctorId: 1
      },
      {
        type: 'Celular',
        ddd: '31',
        number: '991234569',
        doctorId: 1
      },
      {
        type: 'Telefone',
        ddd: '21',
        number: '32987654',
        doctorId: 2
      },
      {
        type: 'Celular',
        ddd: '21',
        number: '998754321',
        doctorId: 2
      },
    ])
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Phones', null, {})
  }
};