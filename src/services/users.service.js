// src/services/userService.js
const bcrypt = require("bcrypt");
const { User } = require("../../models");

const SALT_ROUNDS = 10;

async function hashPassword(plain) {
  return bcrypt.hash(plain, SALT_ROUNDS);
}

// Lấy danh sách user (ẩn password_hash)
async function getUsers() {
  const users = await User.findAll({
    attributes: ["id", "full_name", "email", "role", "is_active", "created_at"],
    order: [["created_at", "DESC"]],
  });
  return users;
}

// Lấy 1 user theo id
async function getUserById(id) {
  const user = await User.findByPk(id, {
    attributes: ["id", "full_name", "email", "role", "is_active", "created_at"],
  });
  return user;
}

// Tạo user mới
async function createUser({ full_name, email, password, role }) {
  const password_hash = await hashPassword(password);

  const user = await User.create({
    full_name,
    email,
    password_hash,
    role: role || "user",
  });

  // Trả về user đã ẩn password_hash
  return getUserById(user.id);
}

// Cập nhật user
async function updateUser(id, { full_name, email, password, role, is_active }) {
  const user = await User.findByPk(id);
  if (!user) return null;

  if (full_name !== undefined) user.full_name = full_name;
  if (email !== undefined) user.email = email;
  if (role !== undefined) user.role = role;
  if (typeof is_active === "boolean") user.is_active = is_active;

  if (password) {
    user.password_hash = await hashPassword(password);
  }

  await user.save();

  return getUserById(id);
}

// Xoá user (hard delete – có thể đổi sang soft delete sau)
async function deleteUser(id) {
  const deletedCount = await User.destroy({ where: { id } });
  return deletedCount > 0;
}

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
