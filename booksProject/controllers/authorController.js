const { Author } = require('../models');
const logAction = require('../middlewares/logAction');


// Получить всех авторов
const getAllAuthors = async (req, res) => {
  const authors = await Author.findAll();
  res.json(authors);
};

// Получить одного автора
const getAuthorById = async (req, res) => {
  const author = await Author.findByPk(req.params.id);
  if (!author) return res.status(404).json({ error: 'Автор не найден' });
  res.json(author);
};

// Создать автора
const createAuthor = async (req, res) => {
  const { firstName, lastName } = req.body;
  const author = await Author.create({ firstName, lastName });
  res.status(201).json(author);

  await logAction({
    userId: req.user.id,
    action: 'create',
    table: 'Author',
    recordID: author.id,
    details: `${author.firstName} ${author.lastName}`,
  });
};

// Обновить автора
const updateAuthor = async (req, res) => {
  const { firstName, lastName } = req.body;
  const author = await Author.findByPk(req.params.id);
  if (!author) return res.status(404).json({ error: 'Автор не найден' });

  author.firstName = firstName ?? author.firstName;
  author.lastName = lastName ?? author.lastName;
  await author.save();

  res.json(author);

  await logAction({
    userId: req.user.id,
    action: 'update',
    table: 'Author',
    recordID: author.id,
    details: `${author.firstName} ${author.lastName}`,
  });
  
};

// Удалить автора
const deleteAuthor = async (req, res) => {
  const author = await Author.findByPk(req.params.id);
  if (!author) return res.status(404).json({ error: 'Автор не найден' });

  await author.destroy();
  res.json({ message: 'Автор удалён' });

  await logAction({
    userId: req.user.id,
    action: 'delete',
    table: 'Author',
    recordID: author.id,
    details: `${author.firstName} ${author.lastName}`,
  });
  

};

module.exports = {
  getAllAuthors,
  getAuthorById,
  createAuthor,
  updateAuthor,
  deleteAuthor,
};
