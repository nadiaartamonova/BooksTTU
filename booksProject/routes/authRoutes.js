
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { verifyToken } = require('../middlewares/authMiddleware'); // Подключаем middleware

const { User, Role } = require('../models');

router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/logout', authController.logout);

/**
 * @swagger
 * /api/auth/me:
 *   get:
 *     summary: Получить данные текущего пользователя
 *     description: Возвращает информацию о текущем пользователе (id, login, роли).
 *     tags:
 *       - Auth
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Успешный ответ с данными пользователя
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 login:
 *                   type: string
 *                 roles:
 *                   type: array
 *                   items:
 *                     type: string
 *       401:
 *         description: Пользователь не авторизован
 *       403:
 *         description: Недействительный токен
 */
router.get('/me', verifyToken, async (req, res) => {
    try {
      const user = await User.findByPk(req.user.id, {
        attributes: ['id', 'login'],
        include: [
          {
            model: Role,
            as: 'Roles', 
            attributes: ['name']
          }
        ]
      });
  
      if (!user) {
        return res.status(404).json({ error: 'Пользователь не найден' });
      }
  
      const roles = user.Roles.map(role => role.name);
  
      res.json({
        id: user.id,
        login: user.login,
        roles: roles
      });
    } catch (err) {
      console.error('Ошибка при получении пользователя:', err);
      res.status(500).json({ error: 'Ошибка сервера' });
    }
  });

module.exports = router;
