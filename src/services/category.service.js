const { Category, Dashboard } = require("../../models");

module.exports = {
  // CREATE
  async create(payload) {
    if (!payload.name) {
      throw new Error("Category name is required");
    }

    return Category.create({
      name: payload.name,
      price: payload.price || 0,
      description: payload.description || null,
    });
  },

  // GET ALL
  async getAll() {
    return Category.findAll({
      order: [["created_at", "DESC"]],
    });
  },

  // GET BY ID
  async getById(id) {
    return Category.findByPk(id);
  },

  // UPDATE
  async update(id, payload) {
    const category = await Category.findByPk(id);
    if (!category) throw new Error("Category not found");

    await category.update({
      name: payload.name ?? category.name,
      price: payload.price ?? category.price,
      description: payload.description ?? category.description,
    });

    return category;
  },

  // DELETE
  async remove(id) {
    const category = await Category.findByPk(id);
    if (!category) throw new Error("Category not found");

    // Optional: check dashboard usage
    const used = await Dashboard.count({
      where: { category_id: id },
    });

    if (used > 0) {
      throw new Error("Category is being used in dashboard");
    }

    await category.destroy();
    return true;
  },
};
