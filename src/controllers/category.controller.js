const categoryService = require("../services/category.service");

module.exports = {
  // CREATE
  async create(req, res) {
    try {
      const data = await categoryService.create(req.body);
      return res.status(201).json({
        success: true,
        data,
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  },

  // GET ALL
  async getAll(req, res) {
    try {
      const data = await categoryService.getAll();
      return res.json({
        success: true,
        data,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  },

  // GET BY ID
  async getById(req, res) {
    try {
      const data = await categoryService.getById(req.params.id);
      if (!data) {
        return res.status(404).json({
          success: false,
          message: "Category not found",
        });
      }
      return res.json({
        success: true,
        data,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  },

  // UPDATE
  async update(req, res) {
    try {
      const data = await categoryService.update(req.params.id, req.body);
      return res.json({
        success: true,
        data,
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  },

  // DELETE
  async remove(req, res) {
    try {
      await categoryService.remove(req.params.id);
      return res.json({
        success: true,
        message: "Deleted successfully",
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  },
};
