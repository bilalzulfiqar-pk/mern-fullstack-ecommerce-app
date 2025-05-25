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

module.exports = {
  sendInquiryEmail,
  sendContactEmail,
};
