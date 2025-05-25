/**
 * This file contains all “email‐sending” handler functions.
 * We initialize the Nodemailer transporter (using Brevo SMTP)
 * only once, then export each email‐flow function.
 */

const nodemailer = require("nodemailer");
// const dotenv = require("dotenv");
const { verifyRecaptchaToken } = require("./recaptchaController");

// dotenv.config(); // loads BREVO_SMTP_USER, BREVO_SMTP_PASS, RECAPTCHA_SECRET_KEY

// Initialize a single Nodemailer transporter using Brevo SMTP:
const transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",
  port: 587,
  auth: {
    user: process.env.BREVO_SMTP_USER, // e.g. Brevo login email
    pass: process.env.BREVO_SMTP_PASS, // Brevo SMTP password
  },
});

/**
 * Function sendInquiryEmail: handles "/api/email/inquiry"
 * Expects body: { name, details, quantity, unit, token }
 */
const sendInquiryEmail = async (req, res) => {
  const { name, details, quantity, unit, token } = req.body;

  // Verify reCAPTCHA
  try {
    const isValid = await verifyRecaptchaToken(token);
    if (!isValid) {
      return res
        .status(400)
        .json({ success: false, message: "reCAPTCHA validation failed." });
    }
  } catch (err) {
    console.error("Error verifying reCAPTCHA (inquiry):", err);
    return res
      .status(500)
      .json({ success: false, message: "Error verifying reCAPTCHA." });
  }

  // Build and send the email
  const mailOptions = {
    from: `"My E-Com Inquiry" <no-reply@brevo.email>`,
    to: process.env.COMPANY_EMAIL,
    subject: `📝 New Inquiry from Website: ${name} (${quantity} ${unit})`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width:600px; margin:auto; padding:20px; border:1px solid #ddd;">
        <h2 style="color:#007bff;">New Product Inquiry</h2>
        <p><strong>Item Name:</strong> ${name}</p>
        <p><strong>Quantity:</strong> ${quantity} ${unit}</p>
        <p><strong>Details:</strong> ${details || "—"}</p>
        <hr style="border:none; border-top:1px solid #eee;" />
        <p style="font-size:0.9em; color:#555;">
          This inquiry was sent on ${new Date().toLocaleString()} from your website.
        </p>
      </div>
    `,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Inquiry email sent (Brevo):", info.messageId);
    return res.json({
      success: true,
      message: "Inquiry emailed successfully.",
    });
  } catch (err) {
    console.error("Error sending inquiry email via Brevo:", err);
    return res
      .status(500)
      .json({ success: false, message: "Failed to send inquiry email." });
  }
};

module.exports = {
  sendInquiryEmail,
};
