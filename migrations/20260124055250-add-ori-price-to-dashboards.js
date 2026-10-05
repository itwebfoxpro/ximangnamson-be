"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("dashboards", "ori_price", {
      type: Sequelize.INTEGER,
      allowNull: true,
      after: "price",
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("dashboards", "ori_price");
  },
};
