"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("dashboards", "ttct", {
      type: Sequelize.STRING, // hoặc TEXT nếu nội dung dài
      allowNull: true,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("dashboards", "ttct");
  },
};
