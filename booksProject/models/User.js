// models/User.js
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      login: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      schema: 'books',
      tableName: 'User',
      timestamps: false,
    }
  );

  User.associate = (models) => {
    // Связь многие-ко-многим с Role через UserRole
    User.belongsToMany(models.Role, {
      through: models.UserRole,
      foreignKey: 'UserID',
      otherKey: 'RoleID',
      as: 'Roles' // Имя ассоциации должно быть уникальным
    });

    User.hasMany(models.Comment, { foreignKey: 'UserID' });
    User.hasMany(models.LOG, { foreignKey: 'UserID' });
  };

  return User;
};
