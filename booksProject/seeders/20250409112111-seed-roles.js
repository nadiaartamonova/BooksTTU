'use strict';

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert(
      { schema: 'books', tableName: 'Role' },
      [
        { id: 1, name: 'Admin' },
        { id: 2, name: 'User' },
      ],
      {}
    );
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete({ schema: 'books', tableName: 'Role' }, null, {});
  },
};
