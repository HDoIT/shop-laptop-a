const mongoose = require("mongoose");

const wishlistSchema = mongoose.Schema(
  {
    wishlistItems: [
      {
        name: {
          type: String,
        },
        // price: {
        //   type: Number,
        // },
        image: {
          type: String,
        },
        product: {
          type: mongoose.Schema.ObjectId,
          ref: "Product",
        },
      },
    ],
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Wishlist", wishlistSchema);
