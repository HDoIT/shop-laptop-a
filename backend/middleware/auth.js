const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("./catchAsyncErrors");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

exports.isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {
  // const { token } = req.cookies;
  const token = req.header("Authorization").split(" ")[1];
  // console.log(req.header("Authorization"));
  if (!token) {
    return next(new ErrorHander("Bạn cần đăng nhập!!!", 401));
  }

  const decodedData = jwt.verify(token, process.env.JWT_SECRET);

  req.user = await User.findById(decodedData.id);

  next();
});

exports.authorizeRoles = (roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorHander(
          `Quyền: ${req.user.role} không được phép truy cập vào trang này `,
          403
        )
      );
    }

    next();
  };
};
