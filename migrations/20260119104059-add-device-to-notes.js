"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("Notes", "device", {
      type: Sequelize.STRING,
      allowNull: true,
      comment: "Thông tin thiết bị, trình duyệt người gửi",
    });
  },

  async down(queryInterface) {
    await queryInterface.removeColumn("Notes", "device");
  },
};
