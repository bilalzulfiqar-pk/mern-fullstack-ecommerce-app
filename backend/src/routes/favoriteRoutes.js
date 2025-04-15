const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const { addToFavorites, removeFromFavorites, getFavorites } = require("../controllers/favoriteController");

// Add a product to favorites
router.post("/add", authMiddleware, addToFavorites);

// Remove a product from favorites
router.delete("/remove", authMiddleware, removeFromFavorites);

// Get all favorite products for the logged-in user
router.get("/", authMiddleware, getFavorites);

module.exports = router;
