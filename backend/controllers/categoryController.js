const Category = require("../models/categoryModel");
const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");

// Get All Categories
exports.getAllCategories = catchAsyncErrors(async (req, res, next) => {
  const categories = await Category.find();

  res.status(200).json({
    success: true,
    categories,
  });
});

// Get Category Details
exports.getCategoryDetails = catchAsyncErrors(async (req, res, next) => {
  const category = await Category.findById(req.params.id);

  if (!category) {
    return next(new ErrorHander("Danh mục không tìm thấy", 404));
  }

  res.status(200).json({
    success: true,
    category,
  });
});

// Create Category (Admin)
exports.createCategory = catchAsyncErrors(async (req, res, next) => {
  const { name, description } = req.body;

  const category = await Category.create({
    name,
    description,
  });

  res.status(201).json({
    success: true,
    category,
  });
});

// Update Category -- Admin
exports.updateCategory = catchAsyncErrors(async (req, res, next) => {
  let category = await Category.findById(req.params.id);

  if (!category) {
    return next(new ErrorHander("Danh mục không tìm thấy", 404));
  }

  category = await Category.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    category,
  });
});

// Delete Category
exports.deleteCategory = catchAsyncErrors(async (req, res, next) => {
  const category = await Category.findById(req.params.id);

  if (!category) {
    return next(new ErrorHander("Danh mục không tìm thấy", 404));
  }

  await category.remove();

  res.status(200).json({
    success: true,
    message: "Xóa thành công danh mục",
  });
});
