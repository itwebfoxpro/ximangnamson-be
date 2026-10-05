// models/product.js
module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "Product",
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      name: { type: DataTypes.STRING, allowNull: false },
      image_url: { type: DataTypes.STRING }, // lưu /images/products/xxx.jpg
      price: { type: DataTypes.DECIMAL(10, 2) },
      // other fields...
    },
    {
      tableName: "products",
      timestamps: true,
    }
  );
};
