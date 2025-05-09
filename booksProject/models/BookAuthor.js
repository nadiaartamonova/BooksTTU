module.exports = (sequelize, DataTypes) => {
    const BookAuthor = sequelize.define(
      'BookAuthor',
      {
        uniqueId: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        BookID: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        AuthorID: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
      },
      {
        schema: 'books',
        tableName: 'BookAuthor',
        timestamps: false,
      }
    );
  
    BookAuthor.associate = (models) => {
      BookAuthor.belongsTo(models.Book, { foreignKey: 'BookID' });
      BookAuthor.belongsTo(models.Author, { foreignKey: 'AuthorID' });
    };
  
    return BookAuthor;
  };
  