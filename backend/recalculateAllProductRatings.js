const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Product = require("./src/models/product");
const Review = require("./src/models/review");

dotenv.config(); // Load .env

const recalculateAllProductRatings = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB ✅");

    const products = await Product.find();

    for (const product of products) {
      const reviews = await Review.find({ product: product._id });

      if (reviews.length === 0) continue;

      const totalRating = reviews.reduce(
        (acc, review) => acc + review.rating,
        0
      );
      const averageRating = totalRating / reviews.length;

      product.rating = averageRating.toFixed(1);
      product.reviews = reviews.length;

      await product.save();
      console.log(`Updated: ${product.name}`);
    }

    console.log("✅ All product ratings and reviews count updated.");
    mongoose.connection.close();
    process.exit();
  } catch (error) {
    console.error("❌ Error:", error);
    mongoose.connection.close();
    process.exit(1);
  }
};

recalculateAllProductRatings();
