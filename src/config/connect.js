const mongoose = require("mongoose");

const mongoDBconnect = () => mongoose.connect(String(process.env.MONGO_URI));

module.exports = mongoDBconnect;
