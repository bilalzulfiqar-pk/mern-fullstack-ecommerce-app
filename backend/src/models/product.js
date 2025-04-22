const mongoose = require("mongoose");

// Define Schema
const productSchema = new mongoose.Schema({
  image: String,
  name: String,
  categories: [String],
  currentPrice: Number,
  bulkPricing: [
    {
      minQuantity: Number,
      maxQuantity: Number,
      price: Number,
    },
  ],
  previousPrice: Number,
  tax: Number,
  rating: {
    type: Number,
    default: 0,
  },
  reviews: {
    type: Number,
    default: 0,
  },
  orders: Number,
  stock: Number,
  shipping: String,
  description: String,
  type: String,
  material: String,
  sizes: [String],
  customization: String,
  protection: String,
  warranty: String,
  thumbnails: [String],
  supplier: {
    name: String,
    location: String,
    verified: Boolean,
    worldwideShipping: Boolean,
  },
});

// Check if the model already exists before defining it
const Product =
  mongoose.models.Product || mongoose.model("Product", productSchema);
  
module.exports = Product;
