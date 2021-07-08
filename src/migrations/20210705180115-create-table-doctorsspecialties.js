'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('DoctorsSpecialties', {
      doctorId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        references: {
          model: 'Doctors',
          key: 'id'
        }
      },
      specialtyId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        references: {
          model: 'Specialties',
          key: 'id'
        }
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('DoctorsSpecialties');
  }
};
