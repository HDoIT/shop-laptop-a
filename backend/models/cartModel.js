const mongoose = require("mongoose");

const cartSchema = mongoose.Schema(
  {
    cartItems: [
      {
        name: {
          type: String,
        },
        price: {
          type: Number,
        },
        priceSale: {
          type: Number,
        },
        quantity: {
          type: Number,
        },
        discountActive: {
          type: Boolean,
        },
        discountPercent: {
          type: Number,
        },
        image: {
          type: String,
        },
        product: {
          type: mongoose.Schema.ObjectId,
          ref: "Product",
        },
      },
    ],
    totalPrice: {
      type: Number,
      required: true,
      default: 0,
    },
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

module.exports = mongoose.model("Cart", cartSchema);
