// src/routes/auth.routes.js

const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");
const authMiddleware = require("../middlewares/auth.middleware");

// login / register (nếu có)
router.post("/login", authController.login);

// 🔥 ĐỔI MẬT KHẨU (BẮT BUỘC CÓ authMiddleware)
router.post("/change-password", authMiddleware, authController.changePassword);

module.exports = router;
