
const { Op } = require('sequelize');
const { Book, Author, Category, Comment, User, sequelize } = require('../models');

const logAction = require('../middlewares/logAction');


const getAllBooks = async (req, res) => {
  try {
    const books = await Book.findAll({
      include: [
        { model: Author, through: { attributes: [] } },
        { model: Category, through: { attributes: [] } },
        {
          model: Comment,
          include: [
            {
              model: User,
              attributes: ['id', 'login'], 
            },
          ],
        },
      ],
    });
    res.json(books);
  } catch (err) {
    console.error('Ошибка при получении книг:', err);
    res.status(500).json({ error: 'Ошибка сервера' });
  }
};

const getBookById = async (req, res) => {
  try {
    const book = await Book.findByPk(req.params.id, {
      include: [
        { model: Author, through: { attributes: [] } },
        { model: Category, through: { attributes: [] } },
        {
          model: Comment,
          include: [
            {
              model: User,
              attributes: ['id', 'login'], 
            },
          ],
        },
      ],
    });

    if (!book) return res.status(404).json({ error: 'Книга не найдена' });
    res.json(book);
  } catch (err) {
    console.error('Ошибка при получении книги:', err);
    res.status(500).json({ error: 'Ошибка сервера' });
  }
};

const createBook = async (req, res) => {
  const { title, year, authorIds = [], categoryIds = [] } = req.body;
  const t = await sequelize.transaction();

  try {

    const currentYear = new Date().getFullYear();
    if (year && (isNaN(year) || year < 1500 || year > currentYear)) {
      return res.status(400).json({ error: `Год должен быть числом между 1500 и ${currentYear}.` });
    }
    
    const authors = await Author.findAll({ where: { id: authorIds } });
    if (authors.length !== authorIds.length) {
      await t.rollback();
      return res.status(400).json({ error: 'Один или несколько авторов не найдены' });
    }

    const categories = await Category.findAll({ where: { id: categoryIds } });
    if (categories.length !== categoryIds.length) {
      await t.rollback();
      return res.status(400).json({ error: 'Одна или несколько категорий не найдены' });
    }

    const book = await Book.create({ title, year }, { transaction: t });

    await book.setAuthors(authors, { transaction: t });
    await book.setCategories(categories, { transaction: t });

    await t.commit();

    const fullBook = await Book.findByPk(book.id, {
      include: [Author, Category],
    });

    await logAction({
      userId: req.user.id,
      action: 'create',
      table: 'Book',
      recordID: book.id,
      details: `book created: ${book.title}`,
    });

    res.status(201).json(fullBook);
  } catch (err) {
    await t.rollback();
    console.error('Ошибка при создании книги:', err);
    res.status(500).json({ error: 'Ошибка сервера' });
  }

};


const updateBook = async (req, res) => {
  const { title, year, authorIds = [], categoryIds = [] } = req.body;
  const bookId = req.params.id;

  const t = await sequelize.transaction();

  try {
    // Проверка на корректный год
    const currentYear = new Date().getFullYear();
    if (year && (isNaN(year) || year < 1500 || year > currentYear)) {
      return res.status(400).json({ error: `Год должен быть числом между 1500 и ${currentYear}.` });
    }

    // Проверка на наличие книги
    const book = await Book.findByPk(bookId, { transaction: t });
    if (!book) {
      await t.rollback();
      return res.status(404).json({ error: 'Книга не найдена' });
    }

    // Проверка на наличие авторов
    if (authorIds.length === 0) {
      await t.rollback();
      return res.status(400).json({ error: 'Необходимо указать хотя бы одного автора.' });
    }

    const authors = await Author.findAll({ where: { id: authorIds } });
    if (authors.length !== authorIds.length) {
      await t.rollback();
      return res.status(400).json({ error: 'Один или несколько авторов не найдены.' });
    }

    // Проверка на наличие категорий
    if (categoryIds.length === 0) {
      await t.rollback();
      return res.status(400).json({ error: 'Необходимо указать хотя бы одну категорию.' });
    }

    const categories = await Category.findAll({ where: { id: categoryIds } });
    if (categories.length !== categoryIds.length) {
      await t.rollback();
      return res.status(400).json({ error: 'Одна или несколько категорий не найдены.' });
    }

    // Обновление данных книги
    if (title) book.title = title.trim();
    if (year) book.year = year;
    await book.save({ transaction: t });

    // Обновление авторов и категорий
    await book.setAuthors(authors, { transaction: t });
    await book.setCategories(categories, { transaction: t });

    await t.commit();

    console.log(bookId);
    console.log('log', {
      userId: req.user?.id,
      bookId,
      title: book.title
    });

    await logAction({
      userId: req.user.id,
      action: 'update',
      table: 'Book',
      recordID: bookId,
      details: `book updated: ${book.title}`,
    });
    
    res.json(book);
  } catch (err) {
    if (!t.finished) {
      await t.rollback();
    }
    console.error('Ошибка при обновлении книги, добавить автора или категорию', err);
    res.status(500).json({ error: 'Ошибка сервера' });
  }
};

const deleteBook = async (req, res) => {
  const t = await sequelize.transaction();
  try {
    const book = await Book.findByPk(req.params.id, { transaction: t });
    if (!book) {
      await t.rollback();
      return res.status(404).json({ error: 'Книга не найдена' });
    }

    await book.setAuthors([], { transaction: t });
    await book.setCategories([], { transaction: t });
    await book.destroy({ transaction: t });

    await t.commit();
    res.json({ message: 'Книга удалена' });

    await logAction({
      userId: req.user.id,
      action: 'delete',
      table: 'Book',
      recordID: book.id,
      details: `book deleted: ${book.title}`,
    });

  } catch (err) {
    await t.rollback();
    console.error('Ошибка при удалении книги:', err);
    res.status(500).json({ error: 'Ошибка сервера' });
  }
};


const searchBooks = async (req, res) => {
  const { query } = req.query;
  if (!query) return res.status(400).json({ error: 'Search query is required' });

  try {
    const books = await Book.findAll({
      include: [
        {
          model: Author,
          as: 'Authors',
          through: { attributes: [] },
          attributes: ['id', 'firstName', 'lastName'],
        },
        {
          model: Category,
          as: 'Categories',
          through: { attributes: [] },
          attributes: ['id', 'name'],
        },
      ],
      where: {
        [Op.or]: [
          { title: { [Op.iLike]: `%${query}%` } },
          { '$Authors.firstName$': { [Op.iLike]: `%${query}%` } },
          { '$Authors.lastName$': { [Op.iLike]: `%${query}%` } },
          { '$Categories.name$': { [Op.iLike]: `%${query}%` } },
        ],
      },
    });

    res.json(books);
  } catch (err) {
    console.error('Ошибка при поиске книг:', err);
    res.status(500).json({ error: 'Ошибка сервера' });
  }
};



module.exports = {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
  searchBooks,
};
