const mongoose = require("mongoose");

let idleTimer = null;
const IDLE_TIMEOUT_MS = 2 * 60 * 1000; // 2 minutes of inactivity

// Reset the 2-minute idle timer on every database interaction
const resetIdleTimer = () => {
  if (idleTimer) clearTimeout(idleTimer);
  idleTimer = setTimeout(async () => {
    if (mongoose.connection.readyState !== 0) {
      console.log("💤 Idle for 2 minutes. Disconnecting MongoDB to allow Railway container to sleep...");
      try {
        await mongoose.disconnect();
        console.log("🔌 MongoDB disconnected cleanly. Outbound network traffic is now zero.");
      } catch (err) {
        console.error("Error disconnecting MongoDB:", err.message);
      }
    }
  }, IDLE_TIMEOUT_MS);

  // Unref the timer so Node.js event loop doesn't stay alive solely because of this timer
  if (idleTimer && idleTimer.unref) {
    idleTimer.unref();
  }
};

const connectDB = async () => {
  // If already connected (readyState 1), just refresh the timer
  if (mongoose.connection.readyState === 1) {
    resetIdleTimer();
    return;
  }

  // If currently connecting (readyState 2), return and let it finish
  if (mongoose.connection.readyState === 2) {
    return;
  }

  try {
    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 15000, // 15 seconds to gracefully handle cold-start reconnects
    });
    console.log("MongoDB Atlas Connected");
    resetIdleTimer();
  } catch (error) {
    console.error("MongoDB Connection Error:", error);
    throw error;
  }
};

// Express middleware: ensure MongoDB is connected before handling any incoming request
const ensureDBConnected = async (req, res, next) => {
  try {
    await connectDB();
    resetIdleTimer();
    next();
  } catch (err) {
    res.status(500).json({ message: "Database connection failed", error: err.message });
  }
};

module.exports = connectDB;
module.exports.connectDB = connectDB;
module.exports.ensureDBConnected = ensureDBConnected;
