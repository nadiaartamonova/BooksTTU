module.exports = (sequelize, DataTypes) => {
    const LOG = sequelize.define(
      'LOG',
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
        createdAt: {
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: DataTypes.NOW,
        },
        action: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        recordID: {
          type: DataTypes.INTEGER,
        },
        table: {
          type: DataTypes.STRING,
        },
        details: {
          type: DataTypes.TEXT,
        },
      },
      {
        schema: 'books',
        tableName: 'LOG',
        timestamps: false,
      }
    );
  
    LOG.associate = (models) => {
      LOG.belongsTo(models.User, { foreignKey: 'UserID' });
    };
  
    return LOG;
  };
  