const { User, Role, UserRole } = require('../models');
const logAction = require('../middlewares/logAction');


const assignRole = async (req, res) => {
  try {
    const userId = parseInt(req.params.userId, 10);
    const roleId = parseInt(req.body.roleId, 10);

    const user = await User.findByPk(userId);
    const role = await Role.findByPk(roleId);

    if (!user || !role) {
      return res.status(404).json({ error: 'Пользователь или роль не найдены' });
    }

    const existing = await UserRole.findOne({ where: { UserID: userId } });

    if (existing) {
      await logAction({
        userId: req.user.id,
        action: 'remove-role',
        table: 'UserRole',
        recordID: existing.id,
        details: `Снята роль ID ${existing.RoleID} с пользователя ${user.login}`,
      });

      await existing.destroy();
    }

    const newUserRole = await UserRole.create({ UserID: userId, RoleID: roleId });

    await logAction({
      userId: req.user.id,
      action: 'assign-role',
      table: 'UserRole',
      recordID: newUserRole.id,
      details: `Назначена роль ${role.name} пользователю ${user.login}`,
    });

    res.json({ message: `Роль ${role.name} назначена пользователю ${user.login}` });

  } catch (err) {
    console.error('Ошибка при назначении роли:', err.message, err.stack);
    res.status(500).json({ error: 'Ошибка сервера' });
  }
};


module.exports = { assignRole };




