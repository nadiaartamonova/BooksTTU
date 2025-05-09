module.exports = (sequelize, DataTypes) => {
    const Book = sequelize.define(
      'Book',
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        title: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        year: {
          type: DataTypes.INTEGER,
        },
      },
      {
        schema: 'books',
        tableName: 'Book',
        timestamps: false,
      }
    );
  
    Book.associate = (models) => {
      Book.belongsToMany(models.Author, {
        through: models.BookAuthor,
        foreignKey: 'BookID',
        otherKey: 'AuthorID',
      });

      Book.belongsToMany(models.Category, {
        through: models.BookCategory,
        foreignKey: 'BookID',
        otherKey: 'CategoryID',
      });
    
      Book.hasMany(models.Comment, { foreignKey: 'BookID' });
    };

  
    return Book;
  };
  