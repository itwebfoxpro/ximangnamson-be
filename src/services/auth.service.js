// src/services/auth.service.js
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { User } = require("../../models");

exports.login = async ({ username, password }) => {
  if (!username || !password) {
    throw { status: 400, message: "Thiếu email hoặc mật khẩu." };
  }

  const user = await User.findOne({
    where:  { username: username }
  });
  if (!user) {
    throw { status: 401, message: "Sai email hoặc mật khẩu." };
  }

  const valid = await bcrypt.compare(password, user.password_hash);
  if (!valid) {
    throw { status: 401, message: "Sai email hoặc mật khẩu." };
  }

  if (user.is_active === 0) {
    throw { status: 403, message: "Tài khoản chưa kích hoạt." };
  }

  const token = jwt.sign(
    { id: user.id, role: user.role, username: user.username },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || "7d" }
  );

  return {
    token,
    user: {
      id: user.id,
      email: user.email,
      role: user.role,
      username: user.username,
    },
  };
};
