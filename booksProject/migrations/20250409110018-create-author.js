'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
      { schema: 'books', tableName: 'Author' },
      {
        id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
        firstName: { type: Sequelize.STRING, allowNull: false },
        lastName: { type: Sequelize.STRING, allowNull: false },
      }
    );
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable({ schema: 'books', tableName: 'Author' });
  },
};
