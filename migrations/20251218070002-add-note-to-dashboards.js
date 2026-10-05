"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("dashboards", "note", {
      type: Sequelize.STRING,
      allowNull: true,
      after: "address", // MySQL: đặt cột sau address
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("dashboards", "note");
  },
};
