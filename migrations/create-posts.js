"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("posts", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },

      title: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },

      slug: {
        type: Sequelize.STRING(255),
        allowNull: false,
        unique: true,
      },

      excerpt: {
        type: Sequelize.TEXT,
        allowNull: true,
      },

      content: {
        type: Sequelize.TEXT("long"),
        allowNull: false,
      },

      thumbnail: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },

      status: {
        type: Sequelize.STRING(20),
        allowNull: false,
        defaultValue: "draft",
      },

      published_at: {
        type: Sequelize.DATE,
        allowNull: true,
      },

      author_id: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },

      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },

      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable("posts");
  },
};
