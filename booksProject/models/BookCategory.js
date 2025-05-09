module.exports = (sequelize, DataTypes) => {
    const BookCategory = sequelize.define(
      'BookCategory',
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        BookID: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        CategoryID: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
      },
      {
        schema: 'books',
        tableName: 'BookCategory',
        timestamps: false,
      }
    );
  
    BookCategory.associate = (models) => {
      BookCategory.belongsTo(models.Book, { foreignKey: 'BookID' });
      BookCategory.belongsTo(models.Category, { foreignKey: 'CategoryID' });
    };
  
    return BookCategory;
  };
  