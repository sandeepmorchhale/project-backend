
const item = require("../models/project.model")
const AdminUser = require("../models/user.modal")
const Contact = require("../models/contact.model")
const fs = require("fs")
const  imagekit  = require("../../Imagkit")


const createnewproduct = async (req, res) => {
    try {
        console.log("Body:", req.body);
        console.log("File:", req.file);

        const { name, description } = req.body;

        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "Image is required"
            });
        }

        // STEP 1 → Local file read karo
        const fileData = fs.readFileSync(req.file.path);

        // STEP 2 → ImageKit pe upload karo
        const uploaded = await imagekit.upload({
            file: fileData,
            fileName: Date.now() + "-" + req.file.originalname
        });

        // uploaded.url = permanent CDN URL
        // uploaded.fileId = file delete karne me kaam aayega

        const newItem = new item({
            img: uploaded.url,      // ❗ Ab filename nahi, URL save hoga
            name,
            description,
        });

        await newItem.save();

        res.json({
            success: true,
            message: "Item saved successfully!",
            imageUrl: uploaded.url  // optional — response me bhi de rahe
        });

    } catch (err) {
        console.error("Upload error:", err);
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};


const adduser = async (req, res) => {
    try {
        console.log("Body:", req.body);
        console.log("File:", req.file);

        const { name, designation, description } = req.body;

        if (!req.file) {
            return res.status(400).json({ success: false, message: "Image is required" });
        }

        const img = req.file.filename;

        const newUser = new AdminUser({
            name,
            designation,
            description,
            img
        });

        await newUser.save();

        res.status(201).json({ success: true, data: newUser });

    } catch (err) {
        console.error("Add Admin User Error:", err);
        res.status(500).json({ success: false, message: err.message });
    }
}


allcontacts = async (req, res) => {
    try {
        const contacts = await Contact.find().sort({ createdAt: -1 });
        res.status(200).json({ success: true, data: contacts });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: err.message });
    }
};


module.exports = {
    createnewproduct,
    adduser,
    allcontacts,

}