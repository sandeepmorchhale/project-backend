const express = require("express");
const app = express();
const cors = require("cors");

const userrouter = require("./routes/user.routes");
const adminrouter = require("./routes/admin.routes");

// CORS (Vercel Compatible)
app.use(cors({
    origin: "*", // Allow all origins (best for deployment)
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploads folder
app.use("/uploads", express.static("uploads"));

// Routes
app.use("/api/user", userrouter);
app.use("/api/admin", adminrouter);

module.exports = app;
