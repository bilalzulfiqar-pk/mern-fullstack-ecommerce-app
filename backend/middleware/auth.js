const jwt = require("jsonwebtoken");
require("dotenv").config();

const JWT_SECRET = process.env.JWT_SECRET; // Replace with an env variable

module.exports = function (req, res, next) {
  const authHeader = req.header("Authorization");
  if (!authHeader)
    return res.status(401).json({ msg: "No token, authorization denied" });

  // Remove "Bearer " prefix if present (or use authHeader.replace("Bearer ", ""))
  const token = authHeader.startsWith("Bearer ")
    ? authHeader.split(" ")[1]
    : authHeader;

  try {
    // Verify token
    // console.log("Token received:", token);
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded.user;
    console.log("Decoded user:", decoded.user); // Log the decoded user data
    next();
  } catch (error) {
    console.error("JWT Verification Error:", error.message);
    res.status(401).json({ msg: "Invalid token" });
  }
};
