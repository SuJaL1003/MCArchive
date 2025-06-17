const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
const { contactController } = require("../controller/contactController");

router.post("/send", contactController);

module.exports = router;
