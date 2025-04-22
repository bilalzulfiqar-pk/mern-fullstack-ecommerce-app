const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: false,
    },
    order: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Order',
      required: false,
    },
    // Optional name field for Sample or Fake reviews that's why made above two required false
    name: {
      type: String,
      required: false,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    comment: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// Prevent duplicate reviews for the same product in the same order
// reviewSchema.index({ product: 1, user: 1, order: 1 }, { unique: true });

// Partial index to allow duplicate reviews for the same product if user or order is not provided
reviewSchema.index(
  { product: 1, user: 1, order: 1 },
  {
    unique: true,
    partialFilterExpression: {
      user: { $type: "objectId" },
      order: { $type: "objectId" },
    },
  }
);


module.exports = mongoose.model('Review', reviewSchema);
