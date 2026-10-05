// src/config/database.js
require("dotenv").config();
const mysql = require("mysql2/promise");

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

/**
 * Kiểm tra kết nối DB khi khởi động server
 */
async function checkDatabaseConnection() {
  try {
    const connection = await pool.getConnection();
    console.log("✅ Database connected");
    connection.release();
  } catch (err) {
    console.error("❌ Database connection failed:", err.message);
    process.exit(1);
  }
}

module.exports = {
  pool,
  checkDatabaseConnection,
};
