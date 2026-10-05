"use strict";

module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define(
    "Post",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },

      title: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },

      slug: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true,
      },

      excerpt: {
        type: DataTypes.TEXT,
        allowNull: true,
      },

      content: {
        type: DataTypes.TEXT("long"),
        allowNull: false,
      },

      thumbnail: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },

      status: {
        type: DataTypes.STRING(20),
        allowNull: false,
        defaultValue: "draft",
      },

      publishedAt: {
        field: "published_at",
        type: DataTypes.DATE,
        allowNull: true,
      },

      authorId: {
        field: "author_id",
        type: DataTypes.STRING(255),
        allowNull: true,
      },
    },
    {
      tableName: "posts",
      underscored: true, // map created_at / updated_at
      timestamps: true,
    }
  );

  /**
   * Associations (tuỳ chọn)
   */
  Post.associate = (models) => {
    // Nếu bạn có model User
    if (models.User) {
      Post.belongsTo(models.User, {
        foreignKey: "author_id",
        as: "author",
      });
    }
  };

  return Post;
};
