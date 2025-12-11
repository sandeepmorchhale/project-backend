require("dotenv").config();
const app = require("./src/app");
const connectDB = require("./src/db/db");

// Connect to MongoDB
connectDB();

// ❗ IMPORTANT: Do NOT use app.listen() in Vercel
// Instead, export the Express app as a module

module.exports = app;
