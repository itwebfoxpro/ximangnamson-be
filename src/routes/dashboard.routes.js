const express = require("express");
const router = express.Router();
const dashboardController = require("../controllers/dashboard.controller");

// ===== STATS (PHẢI ĐỂ TRƯỚC) =====
router.get("/stats/summary", dashboardController.getSummary);
router.get("/payment-summary", dashboardController.getPaymentSummary);
router.get(
  "/stats/monthly-category",
  dashboardController.getMonthlyCategorySummary,
);
router.get("/stats/monthly-profit", dashboardController.getMonthlyProfit);
router.get("/stats/profit-category", dashboardController.getProfitByCategory);

// ===== CRUD =====
router.post("/", dashboardController.create);
router.get("/", dashboardController.getAll);
router.get("/:id", dashboardController.getById);
router.put("/:id", dashboardController.update);
router.delete("/:id", dashboardController.remove);

module.exports = router;
