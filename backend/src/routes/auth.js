const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
require("dotenv").config();
const { body, validationResult } = require("express-validator");

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET; // Replace with an env variable

// @route   POST /api/users/register
// @desc    Register new user
// @access  Public
router.post(
  "/register",
  [
    // Name validations
    body("name", "Name is required").notEmpty(),
    body("name", "Name must be at least 3 characters").isLength({ min: 3 }),
    body("name", "Name must contain only letters and spaces").matches(
      /^[A-Za-z\s]+$/
    ),

    // Email validation
    body("email", "Please enter a valid email").isEmail(),

    // Password validations
    body("password", "Password must be at least 6 characters").isLength({
      min: 6,
    }),
    body("password", "Password must contain at least one number").matches(/\d/),
    body("password", "Password must contain at least one letter").matches(
      /[a-zA-Z]/
    ),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    try {
      const { name, email, password, isAdmin } = req.body;

      // Check if the user already exists
      let user = await User.findOne({ email });
      if (user)
        return res.status(400).json({ msg: "Email already registered" });

      // Hash the password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      // Create new user
      user = new User({
        name,
        email,
        password: hashedPassword,
        isAdmin: isAdmin || false,
      });
      await user.save();

      // Generate JWT Token
      const payload = { user: { id: user.id, isAdmin: user.isAdmin } };
      const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "1d" });

      res.json({ token });
    } catch (error) {
      res.status(500).json({ msg: "Server error" });
    }
  }
);

// @route   POST /api/auth/login
// @desc    Authenticate user & get token
// @access  Public
router.post(
  "/login",
  [
    body("email", "Please enter a valid email").isEmail(),
    body("password", "Password is required").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    try {
      const { email, password } = req.body;

      // Check if user exists
      let user = await User.findOne({ email });
      if (!user) return res.status(400).json({ msg: "Invalid credentials" });

      // Compare passwords
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

      // Generate JWT Token
      const payload = { user: { id: user.id, isAdmin: user.isAdmin } };
      const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "1d" });

      res.json({ token });
    } catch (error) {
      res.status(500).json({ msg: "Server error" });
    }
  }
);

// Middleware to check if user is authenticated
const authMiddleware = require("../middleware/authMiddleware");

// @route   GET /api/auth/user
// @desc    Get logged-in user data
// @access  Private
router.get("/user", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password"); // Exclude password
    res.json(user);
  } catch (error) {
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;
