const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Hãy nhập tên của bạn"],
      maxLength: [30, "Tên không được quá 30 kí tự"],
      minLength: [4, "Tên cần nhiều hơn 4 kí tự"],
    },
    email: {
      type: String,
      required: [true, "Hãy nhập email của bạn"],
      unique: true,
      validate: [validator.isEmail, "Làm ơn nhập đúng định dạng email"],
    },
    password: {
      type: String,
      required: [true, "Hãy nhập mật khẩu của bạn"],
      minLength: [8, "Mật khẩu cần nhiều hơn 8 kí tự"],
      select: false,
    },
    avatar: {
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
    role: {
      //User -> Staff -> Admin
      type: String,
      default: "user",
    },
    shippingInfo: {
      city: {
        type: String,
      },
      state: {
        type: String,
      },
      country: {
        type: String,
      },
      address: {
        type: String,
      },
      phoneNo: {
        type: String,
      },
    },

    resetPasswordToken: String,
    resetPasswordExpire: Date,
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  this.password = await bcrypt.hash(this.password, 10);
});

// JWT TOKEN
userSchema.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

// So sánh password
userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// Tạo password reset token
userSchema.methods.getResetPasswordToken = function () {
  // Tạo token
  const resetToken = crypto.randomBytes(20).toString("hex");

  // Hashing và thêm resetPasswordToken vào userSchema
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;

  return resetToken;
};

module.exports = mongoose.model("User", userSchema);
