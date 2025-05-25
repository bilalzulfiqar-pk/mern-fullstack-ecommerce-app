const express = require("express");
const { sendInquiryEmail } = require("../controllers/emailController");

const router = express.Router();

// POST /api/email/inquiry
router.post("/inquiry", sendInquiryEmail);

// Future endpoints might be:
// router.post("/otp", sendOtpEmail);
// router.post("/forgot", sendForgotPasswordEmail);
// router.post("/order", sendOrderEmail);
// router.post("/contact", sendContactEmail);

module.exports = router;
