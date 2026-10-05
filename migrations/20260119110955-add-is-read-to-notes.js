module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("Notes", "is_read", {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
      allowNull: false,
      comment: "Đánh dấu đã đọc hay chưa",
    });
  },

  async down(queryInterface) {
    await queryInterface.removeColumn("Notes", "is_read");
  },
};
