const mongoose = require("mongoose");
require("dotenv").config();

const DB_URL = process.env.MONGO_URI;

const connectDB = async () => {
  try {
    const connect = await mongoose.connect(DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to Db");
  } catch (error) {
    console.log("Not connected", error);
    process.exit();
  }
};

module.exports = connectDB;
