"use strict";

module.exports = (sequelize, DataTypes) => {
  const Dashboard = sequelize.define(
    "Dashboard",
    {
      user: DataTypes.STRING,
      category_id: DataTypes.INTEGER,
      quantity: DataTypes.INTEGER,
      ori_price: DataTypes.INTEGER,
      price: DataTypes.INTEGER,
      paid: DataTypes.BOOLEAN,
      address: DataTypes.STRING,
      note: DataTypes.STRING,
      ttct: DataTypes.STRING,
      owner: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      tableName: "dashboards",
      underscored: true,
    },
  );

  Dashboard.associate = function (models) {
    Dashboard.belongsTo(models.Category, {
      foreignKey: "category_id",
    });

    Dashboard.belongsTo(models.User, {
      foreignKey: "owner",
      targetKey: "username",
      as: "ownerUser",
    });
  };

  return Dashboard;
};
