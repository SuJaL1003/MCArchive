require("dotenv").config();
const express = require("express");
const cors = require("cors");
const authRoute = require("./routes/authRoutes");

const app = express();

const connectDb = require("./database/db");

//MIDDLEWARES
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDb();

const PORT = process.env.PORT;
app.use("/uploads", express.static("uploads"));

app.use("/api/auth", authRoute);

app.listen(PORT, () => {
  console.log(`Server is Running on ${PORT}`);
});
