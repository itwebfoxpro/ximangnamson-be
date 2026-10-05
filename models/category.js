"use strict";

module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define(
    "Category",
    {
      name: DataTypes.STRING,
      price: DataTypes.INTEGER,
      description: DataTypes.STRING,
    },
    {
      tableName: "categories",
      underscored: true,
    },
  );

  Category.associate = function (models) {
    Category.hasMany(models.Dashboard, {
      foreignKey: "category_id",
    });
  };

  return Category;
};
