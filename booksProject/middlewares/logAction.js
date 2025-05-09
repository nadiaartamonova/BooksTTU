
const { LOG } = require('../models');

const logAction = async ({ userId, action, table, recordID, details }) => {
  try {
    await LOG.create({
      UserID: userId,
      action,
      table,
      recordID,
      details,
    });
  } catch (error) {
    console.error('Ошибка логирования действия:', error);
  }
};

module.exports = logAction;
