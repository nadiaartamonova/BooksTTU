require('dotenv').config();
const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    port: process.env.DB_PORT,
    logging: false,
  }
);

// Подключение моделей вручную
const User = require('./User')(sequelize, DataTypes);
const Role = require('./Role')(sequelize, DataTypes);
const UserRole = require('./UserRole')(sequelize, DataTypes);
const Book = require('./Book')(sequelize, DataTypes);
const Author = require('./Author')(sequelize, DataTypes);
const BookAuthor = require('./BookAuthor')(sequelize, DataTypes);
const Category = require('./Category')(sequelize, DataTypes);
const BookCategory = require('./BookCategory')(sequelize, DataTypes);
const Comment = require('./Comment')(sequelize, DataTypes);
const LOG = require('./LOG')(sequelize, DataTypes);

// Ассоциации (если они есть)
// if (User.associate) User.associate(sequelize.models);
// if (Role.associate) Role.associate(sequelize.models);
// if (UserRole.associate) UserRole.associate(sequelize.models);
if (Book.associate) Book.associate(sequelize.models);
if (Author.associate) Author.associate(sequelize.models);
if (BookAuthor.associate) BookAuthor.associate(sequelize.models);
if (Category.associate) Category.associate(sequelize.models);
if (BookCategory.associate) BookCategory.associate(sequelize.models);
if (Comment.associate) Comment.associate(sequelize.models);
if (LOG.associate) LOG.associate(sequelize.models);

User.belongsToMany(Role, {
  through: UserRole,
  foreignKey: 'UserID',
  otherKey: 'RoleID',
  as: 'Roles'
});

User.hasMany(Comment, { foreignKey: 'UserID' });
User.hasMany(LOG, { foreignKey: 'UserID' });

Role.belongsToMany(User, {
  through: UserRole,
  foreignKey: 'RoleID',
  otherKey: 'UserID',
  as: 'Users'
});

UserRole.belongsTo(User, { foreignKey: 'UserID' });
UserRole.belongsTo(Role, { foreignKey: 'RoleID' });


// Если есть другие ассоциации
// Book.belongsToMany(Author, { through: BookAuthor, as: 'Authors' });
// Book.belongsToMany(Category, { through: BookCategory, as: 'Categories' });

// Category.belongsToMany(Book, { through: BookCategory, as: 'Books' });

// Author.belongsToMany(Book, { through: BookAuthor, as: 'Books' });

// Comment.belongsTo(User, { foreignKey: 'UserID' });
// Comment.belongsTo(Book, { foreignKey: 'BookID' });

// LOG.belongsTo(User, { foreignKey: 'UserID' });



// Экспортируем всё
module.exports = {
  sequelize,
  Sequelize,
  User,
  Role,
  UserRole,
  Book,
  Author,
  BookAuthor,
  Category,
  BookCategory,
  Comment,
  LOG,
};
