const Wishlist = require("../models/wishlistModel");
const Product = require("../models/productModel");
const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");

// Get Wishlist Details
exports.getWishlistDetails = catchAsyncErrors(async (req, res, next) => {
  const wishlist = await Wishlist.findById(req.params.id);

  if (!wishlist) {
    return next(new ErrorHander("Không tìm thấy danh sách yêu thích", 404));
  }

  res.status(200).json({
    success: true,
    wishlist,
  });
});

//Get my Wishlist
exports.myWishlist = catchAsyncErrors(async (req, res, next) => {
  const wishlist = await Wishlist.findOne({ user: req.user._id }).populate({
    path: "wishlistItems.product",
    model: "Product",
  });

  // let cartItems = await cart.cartItems;

  res.status(200).json({
    success: true,
    wishlist,
    // cartItems,
  });
});

// Add wishlist item --  User
exports.addWishlistItem = catchAsyncErrors(async (req, res, next) => {
  const { productId } = req.body;

  let wishlist = await Wishlist.findOne({ user: req.user._id }).populate({
    path: "wishlistItems.product",
    model: "Product",
  });

  let item = await Product.findOne({ _id: productId });

  if (!item) {
    return next(new ErrorHander("Không tìm thấy sản phẩm", 400));
  }

  const name = item.name;
  const image = item.images[0].url;

  if (wishlist) {
    // Nếu user đã có danh sách yêu thích
    let itemIndex = wishlist.wishlistItems.findIndex(
      (p) => p.product._id == productId
    );

    // Kiểm tra xem sản phẩm đã tồn tại hay chưa
    if (!itemIndex > -1) {
      wishlist.wishlistItems.push({
        product: productId,
        name,
        image,
      });
    }

    wishlist = await wishlist.save();
    let wishlistItems = await wishlist.wishlistItems;
    res.status(201).json({
      success: true,
      wishlist,
      wishlistItems,
    });
  } else {
    // Nếu không tồn tại wishlist tạo mới.
    const newWishlist = await Wishlist.create({
      user: req.user._id,
      wishlistItems: [{ product: productId, name, image }],
    });
    let wishlistItems = await newWishlist.wishlistItems;
    res.status(201).json({
      success: true,
      newWishlist,
      wishlistItems,
    });
  }
});

// Delete wishlist Item -- User
exports.wishlistDeleteItem = catchAsyncErrors(async (req, res, next) => {
  const productId = req.params.itemId;

  let wishlist = await Wishlist.findOne({ user: req.user._id });
  let itemIndex = wishlist.wishlistItems.findIndex(
    (p) => p.product == productId
  );

  if (itemIndex > -1) {
    wishlist.wishlistItems.splice(itemIndex, 1);
  }

  wishlist = await wishlist.save();

  res.status(201).json({
    success: true,
    wishlist,
  });
});

// Create Wishlist --  User
exports.createWishlist = catchAsyncErrors(async (req, res, next) => {
  const { wishlistItems } = req.body;

  const wishlist = await Wishlist.create({
    wishlistItems,
    user: req.user._id,
  });

  res.status(201).json({
    success: true,
    wishlist,
  });
});

// Update Wishlist -- User
exports.updateWishlist = catchAsyncErrors(async (req, res, next) => {
  let wishlist = await Wishlist.find({ user: req.user._id });

  if (!wishlist) {
    return next(new ErrorHander("Không tìm thấy danh sách yêu thích", 404));
  }

  wishlist = await Wishlist.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    wishlist,
  });
});

// Delete Wishlist
exports.deleteWishlist = catchAsyncErrors(async (req, res, next) => {
  const wishlist = await Wishlist.findById(req.params.id);

  if (!wishlist) {
    return next(new ErrorHander("Không tìm thấy danh sách yêu thích", 404));
  }

  await wishlist.remove();

  res.status(200).json({
    success: true,
    message: "Xóa thành công danh sách yêu thích",
  });
});
