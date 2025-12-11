const mongoose = require("mongoose");

const adminUserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    designation: { type: String, required: true },
    description: { type: String, required: true },
    img: { type: String, required: true }
}, { timestamps: true });

const AdminUser = mongoose.model("AdminUser", adminUserSchema);

module.exports = AdminUser;  // ✅ Important
