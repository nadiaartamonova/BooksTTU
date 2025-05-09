const express = require('express');
const router = express.Router();
const authorController = require('../controllers/authorController');
const { verifyToken, isAdmin } = require('../middlewares/authMiddleware');

router.get('/', authorController.getAllAuthors);
router.get('/:id', authorController.getAuthorById);
router.post('/', verifyToken, isAdmin, authorController.createAuthor);
router.put('/:id', verifyToken, isAdmin, authorController.updateAuthor);
router.delete('/:id', verifyToken, isAdmin, authorController.deleteAuthor);


module.exports = router;
