// models/Role.js
module.exports = (sequelize, DataTypes) => {
  const Role = sequelize.define(
    'Role',
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
      tableName: 'Role',
      timestamps: false,
    }
  );

  Role.associate = (models) => {
    // Связь многие-ко-многим с User через UserRole
    Role.belongsToMany(models.User, {
      through: models.UserRole,
      foreignKey: 'RoleID',
      otherKey: 'UserID',
      as: 'Users' // Имя ассоциации должно быть уникальным
    });
  };

  return Role;
};
