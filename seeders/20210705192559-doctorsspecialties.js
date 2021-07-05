'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('DoctorsSpecialties',
      [
        {
          doctorId: 1,
          specialtyId: 4,
        },
        {
          doctorId: 1,
          specialtyId: 5,
        },
        {
          doctorId: 2,
          specialtyId: 6,
        },
        {
          doctorId: 2,
          specialtyId: 8,
        },
      ],
      { timestamps: false });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('DoctorsSpecialties', null, {});
  }
};
