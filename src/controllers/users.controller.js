// src/controllers/users.controller.js
const usersService = require("../services/users.service");

/**
 * GET /api/users
 */
exports.getUsers = async (req, res, next) => {
  try {
    const users = await usersService.getUsers();
    res.json(users);
  } catch (err) {
    next(err);
  }
};

/**
 * GET /api/users/:id
 */
exports.getUserById = async (req, res, next) => {
  try {
    const user = await usersService.getUserById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (err) {
    next(err);
  }
};

/**
 * POST /api/users
 */
exports.createUser = async (req, res, next) => {
  try {
    const { full_name, email, password, role } = req.body;
    const user = await usersService.createUser({
      full_name,
      email,
      password,
      role,
    });

    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

/**
 * PUT /api/users/:id
 */
exports.updateUser = async (req, res, next) => {
  try {
    const updated = await usersService.updateUser(req.params.id, req.body);
    if (!updated) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(updated);
  } catch (err) {
    next(err);
  }
};

/**
 * DELETE /api/users/:id
 */
exports.deleteUser = async (req, res, next) => {
  try {
    const ok = await usersService.deleteUser(req.params.id);
    res.json({ success: ok });
  } catch (err) {
    next(err);
  }
};
