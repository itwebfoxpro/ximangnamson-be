// src/controllers/post.controller.js
const postService = require("../services/post.service");

/**
 * GET /api/posts
 */
exports.getPosts = async (req, res, next) => {
  try {
    const posts = await postService.getPosts();
    res.json(posts);
  } catch (err) {
    next(err);
  }
};

/**
 * GET /api/posts/:id
 */
exports.getPostById = async (req, res, next) => {
  try {
    const post = await postService.getPostById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.json(post);
  } catch (err) {
    next(err);
  }
};

/**
 * POST /api/posts
 */
exports.createPost = async (req, res, next) => {
  try {
    const post = await postService.createPost(req.body);
    res.status(201).json(post);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

/**
 * PUT /api/posts/:id
 */
exports.updatePost = async (req, res, next) => {
  try {
    const updated = await postService.updatePost(req.params.id, req.body);
    if (!updated) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.json(updated);
  } catch (err) {
    next(err);
  }
};

/**
 * DELETE /api/posts/:id
 */
exports.deletePost = async (req, res, next) => {
  try {
    const ok = await postService.deletePost(req.params.id);
    res.json({ success: ok });
  } catch (err) {
    next(err);
  }
};
