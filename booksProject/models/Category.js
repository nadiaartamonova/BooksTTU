module.exports = (sequelize, DataTypes) => {
    const Category = sequelize.define(
      'Category',
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
      },
      {
        schema: 'books',
        tableName: 'Category',
        timestamps: false,
      }
    );
  
    Category.associate = (models) => {
      Category.belongsToMany(models.Book, {
        through: models.BookCategory,
        foreignKey: 'CategoryID',
        otherKey: 'BookID',
      });
    };
  
    return Category;
  };
  