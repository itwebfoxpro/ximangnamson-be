// src/server.js
const app = require("./app");
const { checkDatabaseConnection } = require("./config/database");

const PORT = process.env.PORT || 3001;

async function startServer() {
  await checkDatabaseConnection();

  app.listen(PORT, () => {
    console.log(`🚀 Backend API running on port ${PORT}`);
  });
}

startServer();
