module.exports = (sequelize, DataTypes) => {
    const Comment = sequelize.define(
      'Comment',
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        UserID: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        BookID: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        content: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
        createdAt: {
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: DataTypes.NOW,
        },
      },
      {
        schema: 'books',
        tableName: 'Comment',
        timestamps: false,
      }
    );
  
    Comment.associate = (models) => {
      Comment.belongsTo(models.User, { foreignKey: 'UserID' });
      Comment.belongsTo(models.Book, { foreignKey: 'BookID' });
    };
  
    return Comment;
  };
  