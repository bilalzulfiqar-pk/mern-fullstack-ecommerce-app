const axios = require("axios");
const RECAPTCHA_SECRET_KEY = process.env.RECAPTCHA_SECRET_KEY;

/**
 *     Helper to use inside other controllers
 *     return a boolean.
 */
async function verifyRecaptchaToken(token) {
  if (!token) return false;

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

    return googleRes.data.success === true;
  } catch (err) {
    console.error("Error inside verifyRecaptchaToken:", err.message);
    return false;
  }
}

/**
 *     POST /api/verify-recaptcha
 *     that front end can call:
 */
async function verifyRecaptcha(req, res) {
  const { token } = req.body;
  const ok = await verifyRecaptchaToken(token);
  if (ok) {
    return res.json({ success: true });
  } else {
    return res.json({ success: false, errors: ["Invalid token"] }); // , errors: googleData["error-codes"] // , errors: ["Invalid token"]
  }
}

module.exports = {
  verifyRecaptchaToken,
  verifyRecaptcha,
};
