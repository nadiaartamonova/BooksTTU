const jwt = require('jsonwebtoken');
require('dotenv').config();

const { User, Role, UserRole } = require('../models');


const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader?.split(' ')[1]; 

  if (!token) {
    return res.status(401).json({ error: 'Нет токена' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: 'Неверный токен' });
    req.user = user;
    next();
  });
};


const isAdmin = async (req, res, next) => {
  try {
    console.log('controll isAdmin for UserID:', req.user?.id);

    const adminRole = await Role.findOne({ where: { name: 'Admin' } });
    if (!adminRole) {
      console.log('admin role is not found');
      return res.status(500).json({ error: 'admin role is not found' });
    }

    const hasAdmin = await UserRole.findOne({
      where: {
        UserID: req.user.id,
        RoleID: adminRole.id,
      },
    });

    if (!hasAdmin) {
      console.log('u are not admin');
      return res.status(403).json({ error: 'need to be Admin' });
    }

    console.log('ADMIN ok');
    next();
  } catch (err) {
    console.error('err isAdmin:', err);
    res.status(500).json({ error: 'err in access' });
  }
};


const isUser = (req, res, next) => {
  if (req.user?.roles?.includes('User')) {
    next();
  } else {
    res.status(403).json({ error: 'Требуется роль User' });
  }
};

module.exports = {
  verifyToken,
  isAdmin,
  isUser,
};
