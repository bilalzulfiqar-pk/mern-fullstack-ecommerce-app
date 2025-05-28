/**
 * This file contains all “email‐sending” handler functions.
 * We initialize the Nodemailer transporter (using Brevo SMTP)
 * only once, then export each email‐flow function.
 */

const nodemailer = require("nodemailer");
// const dotenv = require("dotenv");
const { verifyRecaptchaToken } = require("./recaptchaController");

const User = require("../models/User");
const EmailOtp = require("../models/EmailOtp");
const crypto = require("crypto");

// dotenv.config(); // loads BREVO_SMTP_USER, BREVO_SMTP_PASS, RECAPTCHA_SECRET_KEY

// Initialize a single Nodemailer transporter using Brevo SMTP:
// const transporter = nodemailer.createTransport({
//   host: "smtp-relay.brevo.com",
//   port: 587,
//   auth: {
//     user: process.env.BREVO_SMTP_USER, // e.g. Brevo login email
//     pass: process.env.BREVO_SMTP_PASS, // Brevo SMTP password
//   },
// });

// Initialize a single Nodemailer transporter using GMail
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER, // your Gmail address (e.g. you@gmail.com)
    pass: process.env.GMAIL_PASS, // an App Password (not your regular Gmail password)
  },
});

/**
 * Function sendInquiryEmail: handles "/api/email/inquiry"
 * Expects body: { name, details, quantity, unit, token }
 */
const sendInquiryEmail = async (req, res) => {
  const { name, details, quantity, unit, token, username, email } = req.body;

  // Verify reCAPTCHA
  try {
    const isValid = await verifyRecaptchaToken(token);
    if (!isValid) {
      return res
        .status(400)
        .json({ success: false, message: "reCAPTCHA validation failed." });
    }
  } catch (err) {
    // console.error("Error verifying reCAPTCHA (inquiry):", err);
    return res
      .status(500)
      .json({ success: false, message: "Error verifying reCAPTCHA." });
  }

  // Build and send the email
  const mailOptions = {
    from: `"My E-Commerce Website Inquiry" <${process.env.GMAIL_USER}>`,
    to: process.env.COMPANY_EMAIL,
    subject: `📝 New Inquiry from E-Commerce Website: ${name} (${quantity} ${unit})`,
    // html: `
    //   <div style="font-family: Arial, sans-serif; max-width:600px; margin:auto; padding:20px; border:1px solid #ddd;">
    //     <h2 style="color:#007bff;">New Product Inquiry</h2>
    //     <p><strong>Item Name:</strong> ${name}</p>
    //     <p><strong>Quantity:</strong> ${quantity} ${unit}</p>
    //     <p><strong>Details:</strong> ${details || "—"}</p>
    //     <hr style="border:none; border-top:1px solid #eee;" />
    //     <p style="font-size:0.9em; color:#555;">
    //       This inquiry was sent on ${new Date().toLocaleString()} from your website.
    //     </p>
    //   </div>
    // `,
    //   html: `
    //   <div style="
    //     font-family: Arial, sans-serif;
    //     max-width: 600px;
    //     margin: 0 auto;
    //     padding: 20px;
    //     border: 1px solid #e0e0e0;
    //     border-radius: 8px;
    //     background-color: #ffffff;
    //   ">
    //     <!-- Header -->
    //     <div style="text-align: center; margin-bottom: 20px;">
    //       <h1 style="
    //         margin: 0;
    //         font-size: 24px;
    //         color: #007bff;
    //       ">
    //         New Product Inquiry
    //       </h1>
    //     </div>

    //     <!-- Inquiry Details -->
    //     <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
    //       <tr>
    //         <td style="padding: 8px; border-bottom: 1px solid #f0f0f0; font-weight: bold; width: 30%;">Item Name:</td>
    //         <td style="padding: 8px; border-bottom: 1px solid #f0f0f0;">${name}</td>
    //       </tr>
    //       <tr>
    //         <td style="padding: 8px; border-bottom: 1px solid #f0f0f0; font-weight: bold;">Quantity:</td>
    //         <td style="padding: 8px; border-bottom: 1px solid #f0f0f0;">${quantity} ${unit}</td>
    //       </tr>
    //       <tr>
    //         <td style="padding: 8px; border-bottom: 1px solid #f0f0f0; font-weight: bold; vertical-align: top;">Details:</td>
    //         <td style="padding: 8px; border-bottom: 1px solid #f0f0f0;">${
    //           details || "—"
    //         }</td>
    //       </tr>
    //       <tr>
    //         <td style="padding: 8px; font-weight: bold;">Submitted by:</td>
    //         <td style="padding: 8px;">
    //           ${
    //             username === "Visitor" && email === "Visitor"
    //               ? "Visitor"
    //               : `${username} &lt;${email}&gt;`
    //           }
    //         </td>
    //       </tr>
    //     </table>

    //     <!-- Footer -->
    //     <div style="font-size: 0.9em; color: #555; border-top: 1px solid #eee; padding-top: 10px;">
    //       <p style="margin: 0;">
    //         Sent on <strong>${new Date().toLocaleString()}</strong> from your website.
    //       </p>
    //     </div>
    //   </div>
    // `,
    html: `
    <table
      width="100%"
      cellpadding="0"
      cellspacing="0"
      border="0"
      style="
        font-family: 'Helvetica Neue', Arial, sans-serif;
        max-width: 600px;
        margin: 0 auto;
        border-collapse: collapse;
        box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
        border-radius: 8px;
        overflow: hidden;
      "
    >
      <!-- HEADER ROW -->
      <tr>
        <td
          align="center"
          bgcolor="#0056b3"
          style="
            padding: 16px 20px;
            color: #ffffff;
            text-align: center;
          "
        >
          <span
            style="
              display: block;
              margin: 0;
              font-size: 22px;
              line-height: 1.3;
              letter-spacing: 0.5px;
            "
          >
            New Product Inquiry 📨
          </span>
        </td>
      </tr>

      <!-- BODY ROW -->
      <tr>
        <td
          bgcolor="#ffffff"
          style="
            padding: 20px;
            color: #333333;
          "
        >
          <!-- “Submitted by” ROW -->
          <table
            width="100%"
            cellpadding="0"
            cellspacing="0"
            border="0"
            style="border-collapse: collapse;"
          >
            <tr>
              <td style="padding: 0 0 12px 0; font-size: 16px; color: #333333;">
                <strong>Submitted by:</strong>
                ${
                  username === "Visitor" && email === "Visitor"
                    ? "Visitor"
                    : `${username} &lt;${email}&gt;`
                }
              </td>
            </tr>
          </table>

          <!-- HORIZONTAL SEPARATOR -->
          <table
            width="100%"
            cellpadding="0"
            cellspacing="0"
            border="0"
            style="border-collapse: collapse;"
          >
            <tr>
              <td
                style="border-top: 1px solid #e0e0e0; padding: 12px 0; line-height: 0;"
              >
                &nbsp;
              </td>
            </tr>
          </table>

          <!-- INQUIRY DETAILS TABLE -->
          <table
            width="100%"
            cellpadding="0"
            cellspacing="0"
            border="0"
            style="border-collapse: collapse; color: #333333;"
          >
            <tr>
              <td
                valign="top"
                style="padding: 8px 0; width: 30%; font-weight: bold;"
              >
                Item Name:
              </td>
              <td style="padding: 8px 0;">
                ${name}
              </td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold;">
                Quantity:
              </td>
              <td style="padding: 8px 0;">
                ${quantity} ${unit}
              </td>
            </tr>
            <tr>
              <td
                valign="top"
                style="padding: 8px 0; font-weight: bold; vertical-align: top;"
              >
                Details:
              </td>
              <td style="padding: 8px 0; line-height: 1.4;">
                ${details || "—"}
              </td>
            </tr>
          </table>

          <!-- TIMESTAMP ROW -->
          <table
            width="100%"
            cellpadding="0"
            cellspacing="0"
            border="0"
            style="border-collapse: collapse; margin-top: 20px;"
          >
            <tr>
              <td style="font-size: 0.9em; color: #777777;">
                Sent on <strong>${new Date().toLocaleString()}</strong> from your website.
              </td>
            </tr>
          </table>
        </td>
      </tr>

      <!-- FOOTER ROW -->
      <tr>
        <td
          bgcolor="#f1f1f1"
          align="center"
          style="
            padding: 12px 20px;
            color: #555555;
            font-size: 0.85em;
          "
        >
          &copy; ${new Date().getFullYear()} Ecommerce Website. All rights reserved.
        </td>
      </tr>
    </table>
  `,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    // console.log("Inquiry email sent:", info.messageId);
    return res.json({
      success: true,
      message: "Inquiry emailed successfully.",
    });
  } catch (err) {
    // console.error("Error sending inquiry email:", err);
    return res
      .status(500)
      .json({ success: false, message: "Failed to send inquiry email." });
  }
};

const sendContactEmail = async (req, res) => {
  const { fullName, email, subject, message, token } = req.body;

  // Verify reCAPTCHA exactly as in sendInquiryEmail
  try {
    const isValid = await verifyRecaptchaToken(token);
    if (!isValid) {
      return res
        .status(400)
        .json({ success: false, message: "reCAPTCHA validation failed." });
    }
  } catch (err) {
    return res
      .status(500)
      .json({ success: false, message: "Error verifying reCAPTCHA." });
  }

  // Build the email payload
  const mailOptions = {
    from: `"E-Commerce Website Contact" <${process.env.GMAIL_USER}>`,
    to: process.env.COMPANY_EMAIL,
    subject: `📬 New Contact-Us Message from E-Commerce Website: ${subject}`,
    html: `
    <table
      width="100%" cellpadding="0" cellspacing="0" border="0"
      style="
        font-family: 'Helvetica Neue', Arial, sans-serif;
        max-width: 600px;
        margin: 0 auto;
        border-collapse: collapse;
        box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
        border-radius: 8px;
        overflow: hidden;
      "
    >
      <!-- HEADER -->
      <tr>
        <td
          align="center"
          bgcolor="#0056b3"
          style="padding: 16px 20px; color: #ffffff; text-align: center;"
        >
          <span
            style="
              display: block;
              margin: 0;
              font-size: 22px;
              line-height: 1.3;
              letter-spacing: 0.5px;
            "
          >
            New Contact-Us Message 📨
          </span>
        </td>
      </tr>

      <!-- BODY -->
      <tr>
        <td bgcolor="#ffffff" style="padding: 20px; color: #333333;">
          <!-- Submitted By -->
          <table width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse: collapse;">
            <tr>
              <td style="padding: 0 0 12px 0; font-size: 16px; color: #333333;">
                <strong>From:</strong> ${fullName} &lt;${email}&gt;
              </td>
            </tr>
          </table>

          <!-- SEPARATOR -->
          <table width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse: collapse;">
            <tr>
              <td style="border-top: 1px solid #e0e0e0; padding: 12px 0; line-height: 0;">&nbsp;</td>
            </tr>
          </table>

          <!-- MESSAGE DETAILS -->
          <table width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse: collapse; color: #333333;">
            <tr>
              <td valign="top" style="padding: 8px 0; width: 30%; font-weight: bold;">
                Subject:
              </td>
              <td style="padding: 8px 0;">
                ${subject}
              </td>
            </tr>
            <tr>
              <td valign="top" style="padding: 8px 0; font-weight: bold; vertical-align: top;">
                Message:
              </td>
              <td style="padding: 8px 0; line-height: 1.4;">
                ${message.replace(/\n/g, "<br>")}
              </td>
            </tr>
          </table>

          <!-- TIMESTAMP -->
          <table width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse: collapse; margin-top: 20px;">
            <tr>
              <td style="font-size: 0.9em; color: #777777;">
                Sent on <strong>${new Date().toLocaleString()}</strong> from the website.
              </td>
            </tr>
          </table>
        </td>
      </tr>

      <!-- FOOTER -->
      <tr>
        <td
          bgcolor="#f1f1f1"
          align="center"
          style="padding: 12px 20px; color: #555555; font-size: 0.85em;"
        >
          &copy; ${new Date().getFullYear()} Ecommerce Website. All rights reserved.
        </td>
      </tr>
    </table>
    `,
  };

  // Send it
  try {
    await transporter.sendMail(mailOptions);
    return res.json({
      success: true,
      message: "Contact email sent successfully.",
    });
  } catch (err) {
    return res
      .status(500)
      .json({ success: false, message: "Failed to send contact email." });
  }
};

/**
 * sendEmailVerificationOtp:
 *   - Generates a 6‐digit OTP
 *   - Saves it in EmailOtp collection with a 5‐minute expiry
 *   - Sends OTP to user.email via Gmail
 */
const sendEmailVerificationOtp = async (req, res) => {
  try {
    // Look up the latest OTP record for this user (sorted by sentAt descending)
    const existing = await EmailOtp.findOne({ userId: req.user.id }).sort({
      sentAt: -1,
    });

    // If an existing record exists and its sentAt + 60 seconds is still in the future → reject
    if (existing) {
      const nextAllowedAt = existing.sentAt.getTime() + 60 * 1000;
      if (Date.now() < nextAllowedAt) {
        return res.status(429).json({
          success: false,
          msg: "Please wait before requesting another code.",
          nextAllowedAt, // timestamp in ms when user may request again
        });
      }
    }

    // Get logged‐in user
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ msg: "User not found" });

    // If already verified, short‐circuit
    if (user.isEmailVerified) {
      return res.status(200).json({ msg: "Email is already verified." });
    }

    // Optionally verify reCAPTCHA if you want extra spam protection:
    // const { token } = req.body;
    // const isValidRecap = await verifyRecaptchaToken(token);
    // if (!isValidRecap) {
    //   return res
    //     .status(400)
    //     .json({ success: false, message: "reCAPTCHA validation failed." });
    // }

    // Generate a 6‐digit numeric OTP string
    const otp = Math.floor(100000 + Math.random() * 900000).toString(); // e.g. "523901"

    // Compute expiry 5 minutes from now
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

    const now = new Date();

    // Store OTP in DB (if an older one exists, delete it first)
    await EmailOtp.deleteMany({ userId: user._id });
    await EmailOtp.create({ userId: user._id, otp, sentAt: now, expiresAt });

    // Send mail via nodemailer
    const mailOptions = {
      from: `"Your App Name" <${process.env.GMAIL_USER}>`,
      to: user.email,
      subject: "Your email verification code",
      text: `Your verification code is: ${otp}\n\nThis code expires in 5 minutes.`,
      html: `
        <!-- Container Table (ensures consistent width across email clients) -->
        <table
          width="100%"
          cellpadding="0"
          cellspacing="0"
          border="0"
          style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px 0;"
        >
          <tr>
            <td align="center">
              <!-- Inner Content Table -->
              <table
                width="600"
                cellpadding="0"
                cellspacing="0"
                border="0"
                style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);"
              >
                <!-- Header with Logo/Branding -->
                <tr>
                  <td
                    align="center"
                    style="background-color: #0056b3; padding: 20px;"
                  >
                    <!-- Replace this with your logo if you have one, otherwise keep text -->
                    <h1 style="color: #ffffff; font-size: 24px; margin: 0;">
                      E-Commerce Store
                    </h1>
                  </td>
                </tr>

                <!-- Greeting / Intro -->
                <tr>
                  <td style="padding: 30px 40px;">
                    <p style="font-size: 16px; color: #333333; margin: 0 0 16px;">
                      Hi <strong>${user.name}</strong>,
                    </p>
                    <p style="font-size: 16px; color: #333333; margin: 0 0 24px;">
                      Thanks for shopping with us! Use the One-Time Password (OTP) below to verify your email address:
                    </p>

                    <!-- OTP Code Section -->
                    <table
                      align="center"
                      cellpadding="0"
                      cellspacing="0"
                      border="0"
                      style="margin: 0 auto 24px auto; width: 100%; max-width: 320px;"
                    >
                      <tr>
                        <td
                          align="center"
                          style="
                            background-color: #f1f1f1;
                            border: 2px dashed #0056b3;
                            border-radius: 6px;
                            padding: 20px;
                          "
                        >
                          <span
                            style="
                              font-family: 'Courier New', Courier, monospace;
                              font-size: 32px;
                              color: #0056b3;
                              letter-spacing: 4px;
                            "
                          >
                            ${otp}
                          </span>
                        </td>
                      </tr>
                    </table>

                    <!-- Expiry Notice -->
                    <p style="font-size: 14px; color: #777777; margin: 0 0 24px;">
                      <em>This OTP code will expire in 5 minutes.</em>
                    </p>

                    <!-- Ignore Notice -->
                    <p style="font-size: 14px; color: #777777; margin: 0 0 32px;">
                      If you did not request this verification, no further action is required.
                    </p>

                    <!-- Support Email Only (no address or phone) -->
                    <p style="font-size: 14px; color: #333333; margin: 0 0 8px;">
                      Need help? Contact us at
                      <a href="mailto:bilalzulfiqar34@gmail.com" style="color: #0056b3;">
                        bilalzulfiqar34@gmail.com
                      </a>.
                    </p>
                  </td>
                </tr>

                <!-- Footer (minimal, no address or policy links) -->
                <tr>
                  <td
                    align="center"
                    style="background-color: #f9f9f9; padding: 20px 40px; font-size: 12px; color: #777777;"
                  >
                    <p style="margin: 0;">
                      &copy; ${new Date().getFullYear()} E-Commerce Store. All rights reserved.
                    </p>
                  </td>
                </tr>
              </table>
              <!-- End Inner Content Table -->
            </td>
          </tr>
        </table>
        <!-- End Container Table -->
      `,
    };

    await transporter.sendMail(mailOptions);

    // Respond with success + nextAllowedAt = now + 60 seconds
    return res.status(200).json({
      success: true,
      msg: "Verification OTP sent to your email.",
      nextAllowedAt: now.getTime() + 60 * 1000,
    });
  } catch (err) {
    console.error("Error in sendEmailVerificationOtp:", err);
    return res.status(500).json({ success: false, msg: "Failed to send OTP." });
  }
};

/**
 * verifyEmailOtp:
 *   - Reads { otp } from req.body
 *   - Checks the latest OTP record for this user, ensures not expired, and matches
 *   - If valid, sets user.isEmailVerified = true, deletes the OTP record.
 */
const verifyEmailOtp = async (req, res) => {
  try {
    const { otp } = req.body;
    if (!otp || otp.trim() === "") {
      return res
        .status(400)
        .json({ errors: [{ msg: "OTP is required", path: "otp" }] });
    }

    // 1) Get user
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }
    if (user.isEmailVerified) {
      return res.status(200).json({ msg: "Email already verified." });
    }

    // 2) Look up the OTP record
    const record = await EmailOtp.findOne({ userId: user._id });
    if (!record) {
      return res.status(400).json({
        errors: [{ msg: "No OTP found. Request a new code.", path: "otp" }],
      });
    }

    // 3) Check expiry
    if (record.expiresAt < new Date()) {
      // OTP expired
      await EmailOtp.deleteMany({ userId: user._id });
      return res.status(400).json({
        errors: [
          { msg: "OTP has expired. Please request a new one.", path: "otp" },
        ],
      });
    }

    // 4) Compare the codes
    if (record.otp !== otp) {
      return res.status(400).json({
        errors: [{ msg: "Invalid OTP. Please try again.", path: "otp" }],
      });
    }

    // 5) Success → mark user verified
    user.isEmailVerified = true;
    await user.save();

    // 6) Delete the OTP record
    await EmailOtp.deleteMany({ userId: user._id });

    return res
      .status(200)
      .json({ success: true, msg: "Email verified successfully." });
  } catch (err) {
    console.error("Error in verifyEmailOtp:", err);
    return res.status(500).json({ success: false, msg: "Server error." });
  }
};

const getEmailOtpStatus = async (req, res) => {
  try {
    // Find the latest OTP for this user
    const record = await EmailOtp
      .findOne({ userId: req.user.id })
      .sort({ sentAt: -1 });

    // If record exists AND sentAt + 60 seconds is in the future, return nextAllowedAt
    if (record) {
      const nextAllowedAt = record.sentAt.getTime() + 60 * 1000;
      if (Date.now() < nextAllowedAt) {
        return res.status(200).json({ nextAllowedAt });
      }
    }

    // Otherwise, no active cooldown
    return res.status(200).json({ nextAllowedAt: null });
  } catch (err) {
    console.error("Error in getEmailOtpStatus:", err);
    return res.status(500).json({ msg: "Server error" });
  }
};

module.exports = {
  sendInquiryEmail,
  sendContactEmail,
  sendEmailVerificationOtp,
  verifyEmailOtp,
  getEmailOtpStatus,
};
