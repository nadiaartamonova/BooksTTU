const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User, Role, UserRole } = require('../models');
require('dotenv').config();

exports.register = async (req, res) => {
  const { login, password } = req.body;
  try {
    const existing = await User.findOne({ where: { login } });
    if (existing) return res.status(400).json({ message: 'user exists' });

    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ login, password: hashed });

    //по дефолту юзер
    await UserRole.create({ UserID: user.id, RoleID: 2 });

    res.status(201).json({ message: 'Success' });
  } catch (err) {
    res.status(500).json({ message: 'Error', error: err.message });
  }
};

exports.login = async (req, res) => {
  const { login, password } = req.body;
  try {
    const user = await User.findOne({ where: { login } });
    if (!user) return res.status(401).json({ message: 'login or password incorect' });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ message: 'login or password incorect' });

    const roles = await UserRole.findAll({ where: { UserID: user.id } });
    const roleIds = roles.map(r => r.RoleID);

    const token = jwt.sign(
      { id: user.id, login: user.login, roles: roleIds },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: 'errror', error: err.message });
  }
};

exports.logout = (req, res) => {
  //logout на клиенте удалить токен
  res.json({ message: 'Logout' });
};


