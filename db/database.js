const mongoose = require("mongoose");
require('dotenv').config()

module.exports = async(cb) => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {});
        console.log("MongoDB are Connected")
        cb()
    } catch (err) {
        console.log(err)
    }
}