const Banner = require("../models/bannerModel");
const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const cloudinary = require("cloudinary");

// Get All Banners
exports.getAllBanners = catchAsyncErrors(async (req, res, next) => {
  const banners = await Banner.find();

  res.status(200).json({
    success: true,
    banners,
  });
});

// Get banner Details
exports.getBannerDetails = catchAsyncErrors(async (req, res, next) => {
  const banner = await Banner.findById(req.params.id);

  if (!banner) {
    return next(new ErrorHander("Không tìm thấy banner", 404));
  }

  res.status(200).json({
    success: true,
    banner,
  });
});

// Create Banner (Admin)
exports.createBanner = catchAsyncErrors(async (req, res, next) => {
  let images = [];

  if (typeof req.body.images === "string") {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }

  const imagesLinks = [];

  for (let i = 0; i < images.length; i++) {
    const result = await cloudinary.v2.uploader.upload(images[i], {
      folder: "banners",
    });

    imagesLinks.push({
      public_id: result.public_id,
      url: result.secure_url,
    });
  }

  req.body.images = imagesLinks;

  const banner = await Banner.create(req.body);
  console.log(req.body);
  res.status(201).json({
    success: true,
    banner,
  });
});

// Update Banner -- Admin
exports.updateBanner = catchAsyncErrors(async (req, res, next) => {
  let banner = await Banner.findById(req.params.id);

  if (!banner) {
    return next(new ErrorHander("Không tìm thấy banner", 404));
  }

  // Xử lý Images
  let images = [];

  if (typeof req.body.images === "string") {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }

  if (images !== undefined) {
    // Xóa ảnh ở Cloudinary
    for (let i = 0; i < banner.images.length; i++) {
      await cloudinary.v2.uploader.destroy(banner.images[i].public_id);
    }

    const imagesLinks = [];

    for (let i = 0; i < images.length; i++) {
      const result = await cloudinary.v2.uploader.upload(images[i], {
        folder: "banners",
      });

      imagesLinks.push({
        public_id: result.public_id,
        url: result.secure_url,
      });
    }

    req.body.images = imagesLinks;
  }

  banner = await Banner.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    banner,
  });
});

// Delete Banner
exports.deleteBanner = catchAsyncErrors(async (req, res, next) => {
  const banner = await Banner.findById(req.params.id);

  if (!banner) {
    return next(new ErrorHander("Không tìm thấy banner", 404));
  }

  // Xóa ảnh ở Cloudinary
  for (let i = 0; i < banner.images.length; i++) {
    await cloudinary.v2.uploader.destroy(banner.images[i].public_id);
  }

  await banner.remove();

  res.status(200).json({
    success: true,
    message: "Xóa thành công banner",
  });
});
