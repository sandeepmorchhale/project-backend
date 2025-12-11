
const express = require("express");
const serverless = require("serverless-http");
const cors = require("cors");
const userrouter = require("./routes/user.routes");
const adminrouter = require("./routes/admin.routes");

const app = express();

app.use(cors({
    origin: "*", // Allow all origins (best for deployment)
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));

app.use(express.json());

app.use("/api/user", userrouter);
app.use("/api/admin", adminrouter);

module.exports = serverless(app);
