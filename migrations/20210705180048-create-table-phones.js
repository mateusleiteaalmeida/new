'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const Phones = await queryInterface.createTable('Phones', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      type: {
        allowNull: false,
        type: Sequelize.STRING
      },
      ddd: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      number: {
        allowNull: false,
        type: Sequelize.INTEGER
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
    return Phones;
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Phones');
  }
};
