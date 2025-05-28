const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/user");
const authMiddleware = require("../middleware/authMiddleware");
const { body, validationResult } = require("express-validator");

const router = express.Router();

// @route   PUT /api/users/update-name
// @desc    Update user name
// @access  Private
router.put(
  "/update-name",
  authMiddleware,
  [
    body("name", "Name is required").not().isEmpty(),
    body("name", "Name must be at least 3 characters long").isLength({
      min: 3,
    }),
    body("name", "Name must contain only letters and spaces").matches(
      /^[A-Za-z\s]+$/
    ),
  ],
  async (req, res) => {
    // Handle validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { name } = req.body;

      if (!name || name.trim() === "") {
        return res.status(400).json({ msg: "Name cannot be empty" });
      }

      const user = await User.findById(req.user.id);
      if (!user) return res.status(404).json({ msg: "User not found" });

      user.name = name;
      await user.save();

      res.json({ msg: "Name updated successfully" });
    } catch (error) {
      res.status(500).json({ msg: "Server error" });
    }
  }
);

// @route   PUT /api/users/update-password
// @desc    Update user password
// @access  Private
router.put(
  "/update-password",
  authMiddleware,
  [
    // Validation for currentPassword
    body("currentPassword", "Current password is required").notEmpty(),

    // Validation for newPassword
    body("newPassword", "New password is required").notEmpty(),
    body(
      "newPassword",
      "New password must be at least 6 characters long"
    ).isLength({
      min: 6,
    }),
    body("newPassword", "Password must contain at least one number").matches(
      /\d/
    ),
    body("newPassword", "Password must contain at least one letter").matches(
      /[a-zA-Z]/
    ),
    body("newPassword", "New password must be different from current password")
      .custom((value, { req }) => value !== req.body.currentPassword)
      .withMessage("New password cannot be the same as current password"),
  ],
  async (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { currentPassword, newPassword } = req.body;

      // Find user by ID
      const user = await User.findById(req.user.id);
      if (!user) return res.status(404).json({ msg: "User not found" });

      // Compare the current password with the stored password
      const isMatch = await bcrypt.compare(currentPassword, user.password);
      if (!isMatch)
        return res.status(400).json({
          errors: [
            {
              msg: "Incorrect current password",
              path: "currentPassword", 
              location: "body",
            },
          ],
        });

      // Hash the new password and update the user's password
      const salt = await bcrypt.genSalt(10);
      const hashedNewPassword = await bcrypt.hash(newPassword, salt);
      user.password = hashedNewPassword;
      await user.save();

      res.json({ msg: "Password updated successfully" });
    } catch (error) {
      res.status(500).json({ msg: "Server error" });
    }
  }
);

module.exports = router;
