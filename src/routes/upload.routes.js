// src/routes/upload.routes.js
const express = require("express");
const router = express.Router();
const upload = require("../utils/upload.util");
const uploadsController = require("../controllers/upload.controller");

router.post(
  "/posts/images",
  upload.array("images", 20),
  uploadsController.uploadPostImages
);

router.get("/posts/images", uploadsController.getPostImages);

router.get("/posts/images/:filename", uploadsController.downloadPostImage);

router.delete("/posts/images/:filename", uploadsController.deletePostImage);

module.exports = router;
