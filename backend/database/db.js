require("dotenv").config();
const mongoose = require("mongoose");

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("MongoDB Connection SuccessFull!");
  } catch (error) {
    console.error("MongoDB Connection Failed!");
    console.error("Error Message:", error.message);
    process.exit(1);
  }
};

module.exports = connectDb;
