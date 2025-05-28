const express = require("express");
const {
  sendInquiryEmail,
  sendContactEmail,
  sendEmailVerificationOtp,
  verifyEmailOtp,
  getEmailOtpStatus,
} = require("../controllers/emailController");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// POST /api/email/inquiry
router.post("/inquiry", sendInquiryEmail);

// POST /api/email/contact
router.post("/contact", sendContactEmail);

// POST /api/email/send‐verification‐otp   (protected: user must be logged in)
router.post("/send-verification-otp", authMiddleware, sendEmailVerificationOtp);

// POST /api/email/verify-otp   (protected: user must be logged in)
router.post("/verify-otp", authMiddleware, verifyEmailOtp);

// GET /api/email/otp-status  (returns { nextAllowedAt } or { nextAllowedAt: null })
router.get("/otp-status", authMiddleware, getEmailOtpStatus);

// Future endpoints might be:
// router.post("/otp", sendOtpEmail);
// router.post("/forgot", sendForgotPasswordEmail);
// router.post("/order", sendOrderEmail);

module.exports = router;
