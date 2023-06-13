const mongoose = require("mongoose");

const contactSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Hãy nhập tên người liên hệ "],
      trim: true,
    },
    email: {
      type: String,
      require: [true, "Hãy nhập email người dùng"],
    },
    title: {
      type: String,
      require: [true, "Hãy nhập tiêu đề"],
    },
    detail: {
      type: String,
      require: [true, "Hãy nhập nội dung"],
    },
    reply: {
      type: String,
    },
    status: {
      type: Boolean,
      require: [true, "Hãy chọn trạng thái trả lời"],
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Contact", contactSchema);
