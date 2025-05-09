const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');

const { verifyToken, isAdmin } = require('../middlewares/authMiddleware');

router.get('/', bookController.getAllBooks);
router.get('/search', bookController.searchBooks);


router.get('/:id', bookController.getBookById);
router.post('/', verifyToken, isAdmin, bookController.createBook);
router.put('/:id', verifyToken, isAdmin, bookController.updateBook);
router.delete('/:id', verifyToken, isAdmin, bookController.deleteBook);


module.exports = router;