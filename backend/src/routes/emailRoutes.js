const express = require("express");
const {
  sendInquiryEmail,
  sendContactEmail,
} = require("../controllers/emailController");

const router = express.Router();

// POST /api/email/inquiry
router.post("/inquiry", sendInquiryEmail);

// POST /api/email/contact
router.post("/contact", sendContactEmail);

// Future endpoints might be:
// router.post("/otp", sendOtpEmail);
// router.post("/forgot", sendForgotPasswordEmail);
// router.post("/order", sendOrderEmail);

module.exports = router;
