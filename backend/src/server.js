require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db"); // Import DB connection

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// CORS to allow frontend requests
// app.use(cors({ origin: "http://localhost:5173", credentials: true }));

// app.use(cors());

const corsOptions = require("./config/corsOptions");

app.use(cors(corsOptions));

app.use(express.json()); // Middleware to parse JSON

const productRoutes = require("./routes/productRoutes");
const authRoutes = require("./routes/auth");
const cartRoutes = require("./routes/cartRoutes");
const orderRoutes = require("./routes/orderRoutes");
const favoriteRoutes = require("./routes/favoriteRoutes");
const reviewRoutes = require("./routes/reviewRoutes");
const userRoutes = require("./routes/userRoutes");

const paymentRoutes = require("./routes/paymentRoutes");

const recaptchaRoutes = require("./routes/recaptchaRoutes");

app.use("/api/users", userRoutes);

app.use("/api/products", productRoutes);
app.use("/api/auth", authRoutes); // Authentication routes
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/reviews", reviewRoutes);

// Payment routes
app.use("/api/payments", paymentRoutes);

// Favorite routes
app.use("/api/favorites", favoriteRoutes);

app.use("/api", recaptchaRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on PORT:${PORT}`);
});
