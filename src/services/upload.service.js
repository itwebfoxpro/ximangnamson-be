/**
 * Upload Service
 * Xử lý logic liên quan đến file upload / đọc file
 */

const fs = require("fs");
const path = require("path");

/**
 * ⚠️ QUAN TRỌNG
 * Multer đang upload vào:
 * src/assets/uploads/posts
 */
const POSTS_UPLOAD_DIR = path.join(__dirname, "../assets/uploads/posts");

/**
 * Trả dữ liệu sau khi upload
 * (file đã được multer lưu sẵn)
 */
exports.uploadPostImages = async (files) => {
  return files.map((file) => ({
    filename: file.filename,
    url: `/uploads/posts/${file.filename}`,
  }));
};

/**
 * Lấy toàn bộ ảnh bài viết
 * GET /api/uploads/posts/images
 */
exports.getPostImages = async () => {
  if (!fs.existsSync(POSTS_UPLOAD_DIR)) {
    return [];
  }

  const files = fs
    .readdirSync(POSTS_UPLOAD_DIR)
    .filter((file) => !file.startsWith(".")); // tránh .DS_Store

  return files.map((filename) => ({
    filename,
    url: `/uploads/posts/${filename}`,
  }));
};

/**
 * Lấy đường dẫn tuyệt đối của 1 ảnh
 * (phục vụ download)
 */
exports.getPostImagePath = async (filename) => {
  const filePath = path.join(POSTS_UPLOAD_DIR, filename);

  if (!fs.existsSync(filePath)) {
    const error = new Error("File không tồn tại");
    error.status = 404;
    throw error;
  }

  return filePath;
};

exports.deletePostImage = async (filename) => {
  const filePath = path.join(POSTS_UPLOAD_DIR, filename);

  if (!fs.existsSync(filePath)) {
    const err = new Error("File không tồn tại");
    err.status = 404;
    throw err;
  }

  fs.unlinkSync(filePath);
  return true;
};