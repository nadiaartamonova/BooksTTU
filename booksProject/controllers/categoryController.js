const { Category } = require('../models');

const logAction = require('../middlewares/logAction');


const getAllCategories = async (req, res) => {
  const categories = await Category.findAll();
  res.json(categories);
};

const getCategoryById = async (req, res) => {
  const category = await Category.findByPk(req.params.id);
  if (!category) return res.status(404).json({ error: 'Категория не найдена' });
  res.json(category);
};

const createCategory = async (req, res) => {
  const { name } = req.body;
  const category = await Category.create({ name });
  res.status(201).json(category);

  await logAction({
    userId: req.user.id,
    action: 'create', 
    table: 'Category',
    recordID: category.id,
    details: category.name,
  });
  

};

const updateCategory = async (req, res) => {
  const { name } = req.body;
  const category = await Category.findByPk(req.params.id);
  if (!category) return res.status(404).json({ error: 'Категория не найдена' });

  category.name = name ?? category.name;
  await category.save();

  res.json(category);

  await logAction({
    userId: req.user.id,
    action: 'update', 
    table: 'Category',
    recordID: category.id,
    details: category.name,
  });
  

};

const deleteCategory = async (req, res) => {
  const category = await Category.findByPk(req.params.id);
  if (!category) return res.status(404).json({ error: 'Категория не найдена' });

  await category.destroy();
  res.json({ message: 'Категория удалена' });

  await logAction({
    userId: req.user.id,
    action: 'delete', 
    table: 'Category',
    recordID: category.id,
    details: category.name,
  });
  
};

module.exports = {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
};
