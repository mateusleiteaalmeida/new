'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Addresses', [
      {
        streetAddress: 'Rua Espirito Santo',
        streetNumber: 420,
        complement: 'Apto 302',
        neighborhood: 'Centro',
        city: 'Belo Horizonte',
        state: 'MG',
        zipCode: 30160030,
        doctorId: 1
      },
      {
        streetAddress: 'Avenida Francisco Bhering',
        streetNumber: 500,
        complement: 'Bloco A',
        neighborhood: 'Ipanema',
        city: 'Rio de Janeiro',
        state: 'RJ',
        zipCode: 22080050,
        doctorId: 2
      }
    ])
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Addresses', null, {})
  }
};
