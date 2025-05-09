const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');
const { verifyToken } = require('../middlewares/authMiddleware');


router.post('/', verifyToken, commentController.addComment);

router.get('/book/:bookId', commentController.getCommentsByBook);
router.put('/:id', verifyToken, commentController.updateComment);
router.delete('/:id', verifyToken, commentController.deleteComment);

module.exports = router;
