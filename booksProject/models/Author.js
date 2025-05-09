module.exports = (sequelize, DataTypes) => {
    const Author = sequelize.define(
      'Author',
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        firstName: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        lastName: {
          type: DataTypes.STRING,
          allowNull: false,
        },
      },
      {
        schema: 'books',
        tableName: 'Author',
        timestamps: false,
      }
    );
  
    Author.associate = (models) => {
      Author.belongsToMany(models.Book, {
        through: models.BookAuthor,
        foreignKey: 'AuthorID',
        otherKey: 'BookID',
      });
    };
  
    return Author;
  };
  