const express = require('express');
const router = express.Router();
const logsController = require('../controllers/logsController');
const { verifyToken, isAdmin } = require('../middlewares/authMiddleware');

router.get('/', verifyToken, isAdmin, logsController.getAllLogs);

module.exports = router;
