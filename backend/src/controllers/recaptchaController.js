const axios = require("axios");

const RECAPTCHA_SECRET_KEY = process.env.RECAPTCHA_SECRET_KEY;

// POST /api/verify-recaptcha
const verifyRecaptcha = async (req, res) => {
  const { token } = req.body;
  if (!token) {
    return res.json({ success: false, message: "No token provided" });
  }

  try {
    const params = new URLSearchParams();
    params.append("secret", RECAPTCHA_SECRET_KEY);
    params.append("response", token);

    const googleRes = await axios.post(
      "https://www.google.com/recaptcha/api/siteverify",
      params.toString(),
      {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      }
    );

    const googleData = googleRes.data;

    if (googleData.success) {
      return res.json({ success: true });
    } else {
      return res.json({ success: false, errors: googleData["error-codes"] });
    }
  } catch (err) {
    console.error("Error verifying reCAPTCHA:", err.message);
    return res.json({ success: false, message: "Error verifying reCAPTCHA" });
  }
};

module.exports = { verifyRecaptcha };
