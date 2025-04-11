const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Validate only Gmail IDs
const validateEmail = (email) => {
  const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
  return gmailRegex.test(email);
};

// Validate strong password: min 6, 1 uppercase, 1 special char
const validatePassword = (password) => {
  const strongPasswordRegex =
    /^(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{6,}$/;
  return strongPasswordRegex.test(password);
};

// ----------- Register User ----------
const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!validateEmail(email)) {
      return res.status(400).json({
        success: false,
        message: "Invalid email! Please use a valid Gmail address.",
      });
    }

    if (!validatePassword(password)) {
      return res.status(400).json({
        success: false,
        message:
          "Password must be at least 6 characters and include 1 uppercase letter and 1 special character.",
      });
    }

    const existingUser = await User.findOne({
      $or: [{ username }, { email }],
    });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists!",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      role: "user", // 🔐 Force all new users to 'user' role
    });

    await newUser.save();

    res.status(201).json({
      success: true,
      message: "User registered successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong!",
    });
  }
};

// ----------- Login User ----------
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials (email not found)",
      });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials (wrong password)",
      });
    }

    const accessToken = jwt.sign(
      {
        userId: user._id,
        email: user.email,
        role: user.role, // Include role in token too if needed
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "15m" }
    );

    const safeUser = {
      _id: user._id,
      username: user.username,
      email: user.email,
      role: user.role, // ✅ Send role to frontend
    };

    res.status(200).json({
      success: true,
      message: "Logged in successfully",
      user: safeUser,
      token: accessToken,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong!",
    });
  }
};

module.exports = { loginUser, registerUser };
