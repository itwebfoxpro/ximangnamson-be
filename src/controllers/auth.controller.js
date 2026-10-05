// src/controllers/auth.controller.js

const authService = require("../services/auth.service");
const bcrypt = require("bcryptjs");
const { User } = require("../../models");

exports.login = async (req, res, next) => {
  try {
    const result = await authService.login(req.body);
    res.json(result);
  } catch (err) {
    next(err);
  }
};

exports.changePassword = async (req, res, next) => {
  try {
    const { oldPassword, newPassword } = req.body;
    const userId = req.user.id;
    console.log(req);
    if (!oldPassword || !newPassword) {
      return res.status(400).json({ message: "Thiếu dữ liệu" });
    }

    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: "User không tồn tại" });
    }

    const isMatch = await bcrypt.compare(oldPassword, user.password_hash);

    if (!isMatch) {
      return res.status(400).json({ message: "Mật khẩu hiện tại không đúng" });
    }

    const hashed = await bcrypt.hash(newPassword, 10);

    await user.update({
      password_hash: hashed,
    });

    res.json({ success: true });
  } catch (err) {
    next(err);
  }
};
