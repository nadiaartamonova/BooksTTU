'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
      { schema: 'books', tableName: 'UserRole' },
      {
        id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
        UserID: {
          type: Sequelize.INTEGER,
          references: { model: { schema: 'books', tableName: 'User' }, key: 'id' },
          onDelete: 'CASCADE',
        },
        RoleID: {
          type: Sequelize.INTEGER,
          references: { model: { schema: 'books', tableName: 'Role' }, key: 'id' },
          onDelete: 'CASCADE',
        },
      }
    );
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable({ schema: 'books', tableName: 'UserRole' });
  },
};
