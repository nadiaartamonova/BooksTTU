'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
      { schema: 'books', tableName: 'BookAuthor' },
      {
        uniqueId: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
        BookID: {
          type: Sequelize.INTEGER,
          references: { model: { schema: 'books', tableName: 'Book' }, key: 'id' },
          onDelete: 'CASCADE',
        },
        AuthorID: {
          type: Sequelize.INTEGER,
          references: { model: { schema: 'books', tableName: 'Author' }, key: 'id' },
          onDelete: 'CASCADE',
        },
      }
    );
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable({ schema: 'books', tableName: 'BookAuthor' });
  },
};
