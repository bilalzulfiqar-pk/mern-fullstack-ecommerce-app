const jwt = require("jsonwebtoken");
require("dotenv").config();

const JWT_SECRET = process.env.JWT_SECRET;

const protect = (req, res, next) => {
  const authHeader = req.header("Authorization");

  if (!authHeader) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  // Extract token from "Bearer <token>"
  const token = authHeader.startsWith("Bearer ")
    ? authHeader.split(" ")[1]
    : authHeader;

  try {
    // Verify token
    const decoded = jwt.verify(token, JWT_SECRET);

    // console.log("Token received:", token);
    // console.log("Decoded user:", decoded);

    req.user = decoded; // Attach decoded token to req.user
    req.userId = decoded.user.id; // Attach userId directly for easier access

    // console.log("req.user:", req.user);
    // console.log("req.userId:", req.userId);

    next();
  } catch (error) {
    console.error("JWT Verification Error:", error.message);

    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token expired, please log in again" });
    }

    res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = { protect };
