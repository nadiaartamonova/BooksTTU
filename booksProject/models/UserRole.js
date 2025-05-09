// models/UserRole.js
module.exports = (sequelize, DataTypes) => {
  const UserRole = sequelize.define(
    'UserRole',
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
      RoleID: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      schema: 'books',
      tableName: 'UserRole',
      timestamps: false,
    }
  );

  UserRole.associate = (models) => {
    UserRole.belongsTo(models.User, { foreignKey: 'UserID' });
    UserRole.belongsTo(models.Role, { foreignKey: 'RoleID' });
  };

  return UserRole;
};
