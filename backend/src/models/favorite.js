const mongoose = require("mongoose");

const favoriteSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to the User model
      required: true,
    },
    products: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product", // Reference to the Product model
        required: true,
      },
    ],
  },
  { timestamps: true }
);

const Favorite = mongoose.model("Favorite", favoriteSchema);

module.exports = Favorite;
