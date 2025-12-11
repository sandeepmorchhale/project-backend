const express = require("express")
const app = express()
const cors = require("cors");
const userrouter = require("./routes/user.routes")
const adminrouter = require("./routes/admin.routes")



app.use(cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static("uploads"));
app.use("/api/user", userrouter)
app.use("/api/admin", adminrouter)



module.exports = app