const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { verifyToken, isAdmin } = require('../middlewares/authMiddleware');


router.post('/:userId/roles', verifyToken, isAdmin, userController.assignRole);

module.exports = router;
