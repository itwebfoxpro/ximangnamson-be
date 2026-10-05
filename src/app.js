// src/app.js
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const path = require("path");

// Routes
const usersRouter = require("./routes/users.routes");
const authRouter = require("./routes/auth.routes");
const dashboardRoutes = require("./routes/dashboard.routes");
const uploadsRouter = require("./routes/upload.routes");
const postRoutes = require("./routes/post.routes");
const categoryRoutes = require("./routes/category.routes");
const authMiddleware = require("./middlewares/auth.middleware");
const noteRoutes = require("./routes/note.routes");

const app = express();

/* ======================
   GLOBAL MIDDLEWARE
====================== */
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms")
);
app.use(express.json());

/* ======================
   CORS CONFIG
====================== */
const whitelist = new Set([
  "http://localhost:3000",
  "http://127.0.0.1:3000",
  "https://ximangnamson.com",
  "https://www.ximangnamson.com",
  "https://namsonjsc.vn",
  "https://www.namsonjsc.vn",
  "http://192.168.1.18:3000",
]);

const corsOptions = {
  origin(origin, callback) {
    if (!origin) return callback(null, true);
    if (whitelist.has(origin)) return callback(null, true);
    return callback(new Error("Not allowed by CORS"));
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
};

app.use(cors(corsOptions));
/* ======================
   ROUTES
====================== */
app.use("/api/auth", authRouter);
app.use("/api/dashboard", authMiddleware, dashboardRoutes);
app.use("/api/uploads", uploadsRouter);
app.use("/api/users", usersRouter);
app.use("/api/posts", postRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api", noteRoutes);

/* ======================
   STATIC FILES
====================== */
app.use(
  "/uploads",
  express.static(path.join(__dirname, "assets/uploads"), {
    maxAge: "30d",
  })
);

/* ======================
   HEALTH CHECK
====================== */
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", time: new Date().toISOString() });
});

/* ======================
   ERROR HANDLER (LAST)
====================== */
app.use((err, req, res, next) => {
  console.error("❌ Error:", err.message);
  res.status(500).json({
    success: false,
    message: err.message || "Server error",
  });
});

module.exports = app;
