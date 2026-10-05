const dashboardService = require("../services/dashboard.service");

exports.getProfitByCategory = async (req, res, next) => {
  try {
    const { month, year } = req.query;
    const data = await dashboardService.getProfitByCategory(
      req.user,
      Number(month),
      Number(year),
    );
    res.json(data);
  } catch (err) {
    next(err);
  }
};

exports.getMonthlyProfit = async (req, res, next) => {
  try {
    const { year } = req.query;
    const data = await dashboardService.getMonthlyProfit(
      req.user,
      Number(year),
    );
    res.json(data);
  } catch (err) {
    next(err);
  }
};

exports.getPaymentSummary = async (req, res, next) => {
  try {
    const data = await dashboardService.getPaymentTotal(req.user);

    console.log("===== TỔNG THANH TOÁN =====");
    console.log("Đã thanh toán:", data.da_thanh_toan);
    console.log("Chưa thanh toán:", data.chua_thanh_toan);
    console.log("Tổng cộng:", data.tong_cong);
    console.log("===========================");

    res.json(data);
  } catch (err) {
    next(err);
  }
};

exports.getMonthlyCategorySummary = async (req, res, next) => {
  try {
    const { month, year } = req.query;
    const data = await dashboardService.getMonthlyByCategory(
      req.user,
      Number(month),
      Number(year),
    );
    res.json(data);
  } catch (err) {
    next(err);
  }
};

// GET ALL
exports.getAll = async (req, res, next) => {
  try {
    console.log("CONTROLLER req.user =", req.user); // debug

    const data = await dashboardService.getAll(req.user); // 🔥 BẮT BUỘC
    res.json(data);
  } catch (err) {
    next(err);
  }
};

// CREATE
exports.create = async (req, res, next) => {
  try {
    const data = await dashboardService.create(req.body, req.user); // 🔥
    res.json(data);
  } catch (err) {
    next(err);
  }
};

// GET BY ID
exports.getById = async (req, res, next) => {
  try {
    const data = await dashboardService.getById(
      req.params.id,
      req.user // 🔥
    );
    res.json(data);
  } catch (err) {
    next(err);
  }
};

// UPDATE
exports.update = async (req, res, next) => {
  try {
    const data = await dashboardService.update(
      req.params.id,
      req.body,
      req.user // 🔥
    );
    res.json(data);
  } catch (err) {
    next(err);
  }
};

// DELETE
exports.remove = async (req, res, next) => {
  try {
    await dashboardService.remove(
      req.params.id,
      req.user // 🔥
    );
    res.json({ success: true });
  } catch (err) {
    next(err);
  }
};

// SUMMARY
exports.getSummary = async (req, res, next) => {
  try {
    const data = await dashboardService.getSummary(req.user); // 🔥
    res.json(data);
  } catch (err) {
    next(err);
  }
};
