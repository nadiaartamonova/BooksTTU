'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
      { schema: 'books', tableName: 'Book' },
      {
        id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
        title: { type: Sequelize.STRING, allowNull: false },
        year: { type: Sequelize.INTEGER },
      }
    );
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable({ schema: 'books', tableName: 'Book' });
  },
};
