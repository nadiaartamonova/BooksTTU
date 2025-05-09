const { Comment } = require('../models');
const logAction = require('../middlewares/logAction');



const addComment = async (req, res) => {
  try {
    const { content, BookID } = req.body;

    if (!content || !BookID) {
      return res.status(400).json({ error: 'Нужны content и BookID' });
    }

    const comment = await Comment.create({
      content,
      BookID,
      UserID: req.user.id, // берём из токена
    });

    res.status(201).json(comment);

    await logAction({
      userId: req.user.id,
      action: 'create',
      table: 'Comment',
      recordID: comment.id,
      details: comment.content,
    });
    

  } catch (err) {
    console.error('Ошибка при добавлении комментария:', err);
    res.status(500).json({ error: 'Ошибка сервера' });
  }
};

const getCommentsByBook = async (req, res) => {
  try {
    const { bookId } = req.params;
    const comments = await Comment.findAll({
      where: { BookID: bookId },
      order: [['createdAt', 'DESC']],
    });
    res.json(comments);
  } catch (err) {
    console.error('Ошибка при получении комментариев:', err);
    res.status(500).json({ error: 'Ошибка сервера' });
  }
};


const updateComment = async (req, res) => {
  try {
    const comment = await Comment.findByPk(req.params.id);

    if (!comment) {
      return res.status(404).json({ error: 'Комментарий не найден' });
    }

    if (comment.UserID !== req.user.id) {
      return res.status(403).json({ error: 'Можно редактировать только свой комментарий' });
    }

    comment.content = req.body.content || comment.content;
    await comment.save();

    res.json(comment);

    await logAction({
      userId: req.user.id,
      action: 'update',
      table: 'Comment',
      recordID: comment.id,
      details: comment.content,
    });
    

  } catch (err) {
    console.error('Ошибка при обновлении комментария:', err);
    res.status(500).json({ error: 'Ошибка сервера' });
  }
};

const deleteComment = async (req, res) => {
  try {
    const comment = await Comment.findByPk(req.params.id);

    if (!comment) {
      return res.status(404).json({ error: 'Комментарий не найден' });
    }

    const isOwner = comment.UserID === req.user.id;
    const isAdmin = req.user.roles?.includes('Admin');

    if (!isOwner && !isAdmin) {
      return res.status(403).json({ error: 'Удалить может только автор или админ' });
    }

    await comment.destroy();
    res.json({ message: 'Комментарий удалён' });

    await logAction({
      userId: req.user.id,
      action: 'delete',
      table: 'Comment',
      recordID: comment.id,
      details: comment.content,
    });
    

  } catch (err) {
    console.error('Ошибка при удалении комментария:', err);
    res.status(500).json({ error: 'Ошибка сервера' });
  }
};

module.exports = {
  addComment,
  getCommentsByBook,
  updateComment,
  deleteComment,
};
