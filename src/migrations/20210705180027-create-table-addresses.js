'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const Addresses = await queryInterface.createTable('Addresses', {
      id: {
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.INTEGER,
        allowNull: false
      },
      zipCode: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      streetAddress: {
        type: Sequelize.STRING,
        allowNull: false
      },
      streetNumber: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      complement: {
        type: Sequelize.STRING,
        allowNull: true
      },
      neighborhood: {
        type: Sequelize.STRING,
        allowNull: false
      },
      city: {
        type: Sequelize.STRING,
        allowNull: false
      },
      state: {
        type: Sequelize.STRING,
        allowNull: false
      },
      doctorId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        references: {
          model: 'Doctors',
          key: 'id'
        }
      },
    });
    return Addresses;
  },


  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Addresses');
  }
};
