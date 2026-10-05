/**
 * Upload Controller
 * Xử lý HTTP request/response cho upload & fetch images
 */

const uploadsService = require("../services/upload.service");

/**
 * POST /api/uploads/posts/images
 * Upload nhiều ảnh bài viết
 * multipart/form-data
 * field: images[]
 */
exports.uploadPostImages = async (req, res, next) => {
  try {
    const files = req.files;

    if (!files || files.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Không có hình ảnh nào được upload",
      });
    }

    const result = await uploadsService.uploadPostImages(files);

    return res.status(201).json({
      success: true,
      message: "Upload hình ảnh thành công",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

/**
 * GET /api/uploads/posts/images
 * Lấy danh sách toàn bộ ảnh bài viết
 */
exports.getPostImages = async (req, res, next) => {
  try {
    const images = await uploadsService.getPostImages();

    return res.json({
      success: true,
      data: images,
    });
  } catch (err) {
    next(err);
  }
};

/**
 * GET /api/uploads/posts/images/:filename
 * Download 1 ảnh cụ thể
 */
exports.downloadPostImage = async (req, res, next) => {
  try {
    const { filename } = req.params;

    const filePath = await uploadsService.getPostImagePath(filename);

    return res.download(filePath);
  } catch (err) {
    next(err);
  }
};

exports.deletePostImage = async (req, res, next) => {
  try {
    const { filename } = req.params;

    await uploadsService.deletePostImage(filename);

    return res.json({
      success: true,
      message: "Đã xoá hình ảnh",
    });
  } catch (err) {
    next(err);
  }
};
