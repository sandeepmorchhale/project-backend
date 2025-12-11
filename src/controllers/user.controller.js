const Contact = require("../models/contact.model")
const item = require("../models/project.model")
const Clintes = require("../models/user.modal")

const submitContact = async (req, res) => {
    try {
        const { name, email, mobile, city } = req.body;
        const newContact = new Contact({ name, email, mobile, city });
        await newContact.save();
        res.status(201).json({ success: true, data: newContact });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: err.message });
    }
};


const allproducts = async (req, res) => {
    try {
        const users = await item.find().sort({ createdAt: -1 });
        res.status(200).json({ success: true, data: users });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: err.message });
    }
}

const allusers = async (req, res) => {
    try {
        const users = await Clintes.find(); // User schema ke hisab se
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: "Server Error" });
    }
}







module.exports = {
    submitContact,
    allproducts,
    allusers
}