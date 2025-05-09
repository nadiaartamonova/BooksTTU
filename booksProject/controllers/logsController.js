const { LOG, User } = require('../models');

const getAllLogs = async (req, res) => {
  try {
    const logs = await LOG.findAll({
      include: [
        {
          model: User,
          attributes: ['id', 'login'],
        },
      ],
      order: [['createdAt', 'DESC']],
    });
    res.json(logs);
  } catch (error) {
    console.error('Ошибка при получении логов:', error);
    res.status(500).json({ error: 'Ошибка сервера' });
  }
};

module.exports = {
  getAllLogs,
};
