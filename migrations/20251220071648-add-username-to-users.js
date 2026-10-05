"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("Users", "username", {
      type: Sequelize.STRING,
      allowNull: true, // cho phép null để không lỗi dữ liệu cũ
      unique: true,
      after: "email", // MySQL: đặt sau cột email (optional)
    });
  },

  async down(queryInterface) {
    await queryInterface.removeColumn("Users", "username");
  },
};
