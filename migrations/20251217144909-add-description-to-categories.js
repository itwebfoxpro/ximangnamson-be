"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("categories", "description", {
      type: Sequelize.STRING(255),
      allowNull: true,
      after: "name", // optional: đặt sau cột name (MySQL)
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("categories", "description");
  },
};
