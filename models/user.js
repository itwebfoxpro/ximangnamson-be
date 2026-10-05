// root/models/user.js;
("use strict");
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // Ví dụ (nếu sau này cần):
      // User.hasMany(models.Post, { foreignKey: "user_id" });
      User.hasMany(models.Dashboard, {
        foreignKey: "owner", // dashboards.owner
        sourceKey: "username", // users.username
        as: "dashboards",
      });
    }
  }

  User.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },

      full_name: {
        type: DataTypes.STRING,
        allowNull: true,
      },

      username: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true,
      },

      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },

      password_hash: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      role: {
        type: DataTypes.ENUM("admin", "editor", "user"),
        allowNull: false,
        defaultValue: "user",
      },

      is_active: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
    },
    {
      sequelize,
      modelName: "User",
      tableName: "Users",
      timestamps: true,
      underscored: true,
    }
  );

  return User;
};
