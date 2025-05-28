const mongoose = require("mongoose");

const EmailOtpSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    otp: {
      type: String,
      required: true,
    },
    sentAt: { type: Date, required: true },
    expiresAt: {
      type: Date,
      required: true,
      index: { expires: 0 },
      // the “expires” option makes MongoDB auto-delete once expiresAt < now
      // (a TTL index with “expires: 0” means “expire at the exact Date in expiresAt”)
    },
  },
  { timestamps: true }
);

module.exports =
  mongoose.models.EmailOtp || mongoose.model("EmailOtp", EmailOtpSchema);
