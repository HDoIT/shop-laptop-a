const mongoose = require("mongoose");

const blogSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Hãy nhập tiêu đề cho tin tức"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Hãy nhập giới thiệu cho tin tức"],
    },
    detail: {
      type: String,
      required: [true, "Hãy nhập nội dung cho tin tức"],
    },
    image: {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
        default:
          "https://res.cloudinary.com/phuockaito/image/upload/v1617902959/user/1_gxwhfk.jpg",
      },
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
    category: {
      type: String,
      required: [true, "Hãy nhập danh mục cho tin tức"],
    },
    numOfReviews: {
      type: Number,
      default: 0,
    },
    reviews: [
      {
        user: {
          type: mongoose.Schema.ObjectId,
          ref: "User",
          required: true,
        },
        name: {
          type: String,
          required: true,
        },
        comment: {
          type: String,
          required: true,
        },
        createAt: {
          type: Date,
          default: Date.now(),
        },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Blog", blogSchema);
