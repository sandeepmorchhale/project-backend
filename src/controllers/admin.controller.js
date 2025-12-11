// controllers/admin.controller.js

const Item = require("../models/project.model");
const AdminUser = require("../models/user.modal");
const Contact = require("../models/contact.model");
const fs = require("fs");
const imagekit = require("../../Imagkit"); // Your ImageKit config

// --------------------- CREATE NEW PRODUCT ---------------------
const createnewproduct = async (req, res) => {
  try {
    const { name, description } = req.body;

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Image is required",
      });
    }

    // STEP 1 → Read local file (temporary)
    const fileData = fs.readFileSync(req.file.path);

    // STEP 2 → Upload to ImageKit
    const uploaded = await imagekit.upload({
      file: fileData,
      fileName: Date.now() + "-" + req.file.originalname,
    });

    // STEP 3 → Delete temporary local file
    fs.unlinkSync(req.file.path);

    // STEP 4 → Save product to DB with ImageKit URL
    const newItem = new Item({
      img: uploaded.url, // ImageKit CDN URL
      name,
      description,
    });

    await newItem.save();

    res.status(201).json({
      success: true,
      message: "Item saved successfully!",
      data: newItem,
      imageUrl: uploaded.url,
    });
  } catch (err) {
    console.error("Upload error:", err);
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// --------------------- ADD ADMIN USER ---------------------
const adduser = async (req, res) => {
  try {
    const { name, designation, description } = req.body;

    if (!req.file) {
      return res
        .status(400)
        .json({ success: false, message: "Image is required" });
    }

    // STEP 1 → Read local file
    const fileData = fs.readFileSync(req.file.path);

    // STEP 2 → Upload to ImageKit
    const uploaded = await imagekit.upload({
      file: fileData,
      fileName: Date.now() + "-" + req.file.originalname,
    });

    // STEP 3 → Delete temporary file
    fs.unlinkSync(req.file.path);

    // STEP 4 → Save admin user in DB
    const newUser = new AdminUser({
      name,
      designation,
      description,
      img: uploaded.url, // ImageKit CDN URL
    });

    await newUser.save();

    res.status(201).json({
      success: true,
      message: "Admin user added successfully!",
      data: newUser,
    });
  } catch (err) {
    console.error("Add Admin User Error:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};

// --------------------- GET ALL CONTACTS ---------------------
const allcontacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: contacts });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: err.message });
  }
};


    //  modified:   package-lock.json
    //     modified:   package.json
    //     modified:   src/app.js
    //     modified:   src/controllers/admin.controller.js
    //     modified:   vercel.json

module.exports = {
  createnewproduct,
  adduser,
  allcontacts,
};
