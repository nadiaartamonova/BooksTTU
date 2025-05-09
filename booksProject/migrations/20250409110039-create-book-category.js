'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
      { schema: 'books', tableName: 'BookCategory' },
      {
        id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
        BookID: {
          type: Sequelize.INTEGER,
          references: { model: { schema: 'books', tableName: 'Book' }, key: 'id' },
          onDelete: 'CASCADE',
        },
        CategoryID: {
          type: Sequelize.INTEGER,
          references: { model: { schema: 'books', tableName: 'Category' }, key: 'id' },
          onDelete: 'CASCADE',
        },
      }
    );
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable({ schema: 'books', tableName: 'BookCategory' });
  },
};
