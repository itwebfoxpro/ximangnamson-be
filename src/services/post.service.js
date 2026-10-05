// src/services/post.service.js
const { Post } = require("../../models");
const slugify = require("slugify");

exports.getPosts = async () => {
  return Post.findAll({
    order: [["created_at", "DESC"]],
  });
};

exports.getPostById = async (id) => {
  return Post.findByPk(id);
};

exports.createPost = async (data) => {
  const { title, content } = data;

  if (!title || !content) {
    throw new Error("Title and content are required");
  }

  const slug = slugify(title, { lower: true, strict: true });

  return Post.create({
    ...data,
    slug,
  });
};

exports.updatePost = async (id, data) => {
  const post = await Post.findByPk(id);
  if (!post) return null;

  if (data.title && data.title !== post.title) {
    data.slug = slugify(data.title, {
      lower: true,
      strict: true,
    });
  }

  await post.update(data);
  return post;
};

exports.deletePost = async (id) => {
  const post = await Post.findByPk(id);
  if (!post) return false;

  await post.destroy();
  return true;
};
