const mongoose = require("mongoose");
require('dotenv').config();

const mongodb = () => {
    const MONGODB_URL = process.env.MONGODB_URL;

    mongoose.connect(MONGODB_URL)
        .then(() => { console.log("Database Atlas connected successfully") })
        .catch((error) => { console.log("Please check your code, DB is not connected", error) });
}

module.exports = mongodb;
