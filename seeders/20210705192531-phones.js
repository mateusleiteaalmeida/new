'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Phones', [
      {
        type: 'celular',
        ddd: '31',
        number: '991234569',
        doctorId: 1
      },
      {
        type: 'telefone',
        ddd: '31',
        number: '31231234',
        doctorId: 1
      },
      {
        type: 'celular',
        ddd: '21',
        number: '998754321',
        doctorId: 2
      },
      {
        type: 'telefone',
        ddd: '21',
        number: '32987654',
        doctorId: 2
      }
    ])
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Phones', null, {})
  }
};
