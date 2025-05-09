'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
      { schema: 'books', tableName: 'LOG' },
      {
        id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
        UserID: {
          type: Sequelize.INTEGER,
          references: { model: { schema: 'books', tableName: 'User' }, key: 'id' },
          onDelete: 'CASCADE',
        },
        createdAt: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
        action: { type: Sequelize.STRING, allowNull: false },
        recordID: { type: Sequelize.INTEGER },
        table: { type: Sequelize.STRING },
        details: { type: Sequelize.TEXT },
      }
    );
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable({ schema: 'books', tableName: 'LOG' });
  },
};
