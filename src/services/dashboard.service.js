const { Dashboard, Category } = require("../../models");
const { Op, fn, col, literal } = require("sequelize");

module.exports = {
  // TÍNH TỔNG ĐÃ THANH TOÁN & CHƯA THANH TOÁN

  async getProfitByCategory(authUser, month, year) {
    return Dashboard.findAll({
      attributes: [
        "category_id",
        [
          fn(
            "SUM",
            literal("(Dashboard.price - Dashboard.ori_price) * Dashboard.quantity")
          ),
          "profit",
        ],
      ],
      where: {
        owner: authUser.username,
        paid: true,
        created_at: {
          [Op.between]: [
            new Date(year, month - 1, 1),
            new Date(year, month, 0, 23, 59, 59),
          ],
        },
      },
      include: [
        {
          model: Category,
          attributes: ["name"],
        },
      ],
      group: ["Dashboard.category_id", "Category.id", "Category.name"],
      raw: true,
    });
  },

  async getMonthlyProfit(authUser, year) {
    return Dashboard.findAll({
      attributes: [
        [fn("MONTH", col("Dashboard.created_at")), "month"],
        [
          fn(
            "SUM",
            literal(
              "(Dashboard.price - COALESCE(Dashboard.ori_price, 0)) * Dashboard.quantity"
            )
          ),
          "profit",
        ],
      ],
      where: {
        owner: authUser.username,
        paid: true,
        created_at: {
          [Op.between]: [
            new Date(year, 0, 1),
            new Date(year, 11, 31, 23, 59, 59),
          ],
        },
      },
      group: [literal("MONTH(Dashboard.created_at)")],
      order: [[literal("month"), "ASC"]],
      raw: true,
    });
  },  

  async getPaymentTotal(authUser) {
    const paidTotalRow = await Dashboard.findOne({
      attributes: [[fn("SUM", literal("price * quantity")), "total"]],
      where: {
        owner: authUser.username,
        paid: true,
      },
      raw: true,
    });

    const unpaidTotalRow = await Dashboard.findOne({
      attributes: [[fn("SUM", literal("price * quantity")), "total"]],
      where: {
        owner: authUser.username,
        paid: false,
      },
      raw: true,
    });

    const paidTotal = paidTotalRow?.total || 0;
    const unpaidTotal = unpaidTotalRow?.total || 0;

    return {
      da_thanh_toan: Number(paidTotal),
      chua_thanh_toan: Number(unpaidTotal),
      tong_cong: Number(paidTotal) + Number(unpaidTotal),
    };
  },

  async getMonthlyByCategory(authUser, month, year) {
    const startDate = new Date(year, month - 1, 1, 0, 0, 0);
    const endDate = new Date(year, month, 0, 23, 59, 59);

    const result = await Dashboard.findAll({
      attributes: [
        "category_id",
        [fn("SUM", col("Dashboard.quantity")), "total_quantity"],
      ],
      where: {
        owner: authUser.username,
        created_at: {
          [Op.between]: [startDate, endDate],
        },
      },
      include: [
        {
          model: Category,
          attributes: ["name"],
        },
      ],
      group: ["Dashboard.category_id", "Category.id", "Category.name"],
      raw: true,
    });

    return result;
  },

  // CREATE
  async create(payload, authUser) {
    if (payload.category_id) {
      const category = await Category.findByPk(payload.category_id);
      if (!category) throw new Error("Category not found");
    }

    return Dashboard.create({
      owner: authUser.username, // 🔥 CHUẨN
      user: payload.user, // 👈 tên khách hàng
      category_id: payload.category_id,
      quantity: payload.quantity || 1,
      ori_price: payload.oriPrice,
      price: payload.price,
      paid: payload.paid ?? false,
      address: payload.address,
      note: payload.note,
    });
  },

  // GET ALL
  async getAll(authUser) {
    console.log("SERVICE authUser =", authUser); // 👈 LOG 5

    return Dashboard.findAll({
      where: { owner: authUser.username },
      include: [
        {
          model: Category,
          attributes: ["id", "name", "price"],
        },
      ],
      order: [["created_at", "DESC"]],
    });
  },

  // GET BY ID
  async getById(id, authUser) {
    return Dashboard.findOne({
      where: {
        id,
        owner: authUser.username,
      },
      include: [
        {
          model: Category,
          attributes: ["id", "name", "price"],
        },
      ],
    });
  },

  // UPDATE
  async update(id, payload, authUser) {
    const dashboard = await Dashboard.findOne({
      where: {
        id,
        owner: authUser.username,
      },
    });
    if (!dashboard) throw new Error("Dashboard not found or no permission");

    if (payload.category_id) {
      const category = await Category.findByPk(payload.category_id);
      if (!category) throw new Error("Category not found");
    }

    await dashboard.update({
      user: payload.user ?? dashboard.user,
      category_id: payload.category_id ?? dashboard.category_id,
      quantity: payload.quantity ?? dashboard.quantity,
      ori_price: payload.oriPrice,
      price: payload.price ?? dashboard.price,
      paid: payload.paid ?? dashboard.paid,
      address: payload.address ?? dashboard.address,
      note: payload.note ?? dashboard.note,
    });

    return dashboard;
  },

  // DELETE
  async remove(id, authUser) {
    const dashboard = await Dashboard.findOne({
      where: {
        id,
        owner: authUser.username,
      },
    });

    if (!dashboard) throw new Error("Dashboard not found or no permission");

    await dashboard.destroy();
    return true;
  },
  // SUMMARY (dashboard statistics)
  async getSummary(authUser) {
    const where = { owner: authUser.username };

    const totalOrders = await Dashboard.count({ where });

    const totalRevenue = await Dashboard.sum("price", {
      where: { ...where, paid: true },
    });

    const totalUnpaid = await Dashboard.sum("price", {
      where: { ...where, paid: false },
    });

    return {
      totalOrders,
      totalRevenue: totalRevenue || 0,
      totalUnpaid: totalUnpaid || 0,
    };
  },
};
