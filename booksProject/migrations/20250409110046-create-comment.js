'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
      { schema: 'books', tableName: 'Comment' },
      {
        id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
        UserID: {
          type: Sequelize.INTEGER,
          references: { model: { schema: 'books', tableName: 'User' }, key: 'id' },
          onDelete: 'CASCADE',
        },
        BookID: {
          type: Sequelize.INTEGER,
          references: { model: { schema: 'books', tableName: 'Book' }, key: 'id' },
          onDelete: 'CASCADE',
        },
        content: { type: Sequelize.TEXT, allowNull: false },
        createdAt: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
      }
    );
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable({ schema: 'books', tableName: 'Comment' });
  },
};
