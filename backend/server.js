require("dotenv").config();
const express = require("express");
const cors = require("cors");
const authRoute = require("./routes/authRoutes");
const pdfRoute = require("./routes/pdfRoutes");

const app = express();

const connectDb = require("./database/db");
connectDb();

//MIDDLEWARES
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const PORT = process.env.PORT;

app.use("/api/auth", authRoute);
app.use("/api/pdf", pdfRoute);
app.use("/api/pyq", pdfRoute);

app.listen(PORT, () => {
  console.log(`Server is Running on ${PORT}`);
});
