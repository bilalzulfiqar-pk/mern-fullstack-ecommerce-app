const Favorite = require("../models/favorite");
const Product = require("../models/product");

// Get all favorite products for the logged-in user
const getFavorites = async (req, res) => {
  const userId = req.user.id;

  try {
    const favorite = await Favorite.findOne({ user: userId }).populate(
      "products"
    );
    // If the user has no favorites, return an empty array with 200
    if (!favorite) {
      return res.status(200).json([]);
    }

    res.status(200).json(favorite.products);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error fetching favorites",
      error: error.message,
    });
  }
};

// Add product to favorites
const addToFavorites = async (req, res) => {
  const { id: userId } = req.user;
  const { productId } = req.body;

  if (!productId) {
    return res.status(400).json({ message: "Product ID is required" });
  }

  try {
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    let favorite = await Favorite.findOne({ user: userId });
    if (!favorite) {
      favorite = new Favorite({ user: userId, products: [] });
    }

    const productIdStr = productId.toString();
    const alreadyFavorite = favorite.products.some(
      (id) => id.toString() === productIdStr
    );

    if (!alreadyFavorite) {
      favorite.products.push(productId);
      await favorite.save();

      return res.status(201).json({
        message: "Product added to favorites",
        // favorite,
      });
    } else {
      return res
        .status(400)
        .json({ message: "Product is already in favorites" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error adding product to favorites",
      error: error.message,
    });
  }
};

// Remove product from favorites
const removeFromFavorites = async (req, res) => {
  const { id: userId } = req.user;
  const { productId } = req.body;

  if (!productId) {
    return res.status(400).json({ message: "Product ID is required" });
  }

  try {
    const favorite = await Favorite.findOne({ user: userId });

    if (!favorite) {
      return res.status(404).json({ message: "Favorites not found" });
    }

    const productIdStr = productId.toString();
    const initialLength = favorite.products.length;

    favorite.products = favorite.products.filter(
      (id) => id.toString() !== productIdStr
    );

    if (favorite.products.length === initialLength) {
      return res.status(400).json({ message: "Product was not in favorites" });
    }

    await favorite.save();

    res.status(200).json({
      message: "Product removed from favorites",
      // favorite,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error removing product from favorites",
      error: error.message,
    });
  }
};

module.exports = {
  getFavorites,
  addToFavorites,
  removeFromFavorites,
};
