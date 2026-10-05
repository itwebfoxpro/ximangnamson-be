"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("dashboards", "owner", {
      type: Sequelize.STRING,
      allowNull: true, // an toàn vì bảng đã có dữ liệu
      after: "user", // MySQL: đặt sau cột user (optional)
    });
  },

  async down(queryInterface) {
    await queryInterface.removeColumn("dashboards", "owner");
  },
};
