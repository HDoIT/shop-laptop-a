const mongoose = require("mongoose");

const bannerSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Hãy nhập tiêu đề"],
    },
    description: {
      type: String,
      required: [true, "Hãy nhập giới thiệu"],
    },
    status: {
      type: Boolean,
      default: false,
    },
    images: [
      {
        public_id: {
          type: String,
          required: true,
        },
        url: {
          type: String,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Banner", bannerSchema);
