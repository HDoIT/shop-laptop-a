const Order = require("../models/orderModel");
const Product = require("../models/productModel");
const Cart = require("../models/cartModel");
const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");

// Create new Order
exports.newOrder = catchAsyncErrors(async (req, res, next) => {
  const {
    shippingInfo,
    orderItems,
    name,
    email,
    paymentInfo,
    itemsPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  if (req.body.user) {
    let cart = await Cart.findOne({ user: req.body.user });
    if (cart) {
      const data = await Cart.findByIdAndDelete({ _id: cart._id });
    }
  }

  if (req.body.user) {
    const order = await Order.create({
      shippingInfo,
      orderItems,
      name,
      email,
      paymentInfo,
      itemsPrice,
      shippingPrice,
      totalPrice,
      paidAt: Date.now(),
      user: req.body.user,
    });

    res.status(201).json({
      success: true,
      order,
    });
  } else {
    const order = await Order.create({
      shippingInfo,
      orderItems,
      name,
      email,
      paymentInfo,
      itemsPrice,
      shippingPrice,
      totalPrice,
      paidAt: Date.now(),
      // user: req.user._id,
    });

    res.status(201).json({
      success: true,
      order,
    });
  }
});

// get Single Order
exports.getSingleOrder = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return next(new ErrorHander("Đơn hàng không tìm thấy với Id", 404));
  }

  res.status(200).json({
    success: true,
    order,
  });
});

// Lấy my orders
exports.myOrders = catchAsyncErrors(async (req, res, next) => {
  const orders = await Order.find({ user: req.user._id });

  res.status(200).json({
    success: true,
    orders,
  });
});

// get all Orders -- Admin
exports.getAllOrders = catchAsyncErrors(async (req, res, next) => {
  const orders = await Order.find();

  let totalAmount = 0;

  orders.forEach((order) => {
    totalAmount += order.totalPrice;
  });

  res.status(200).json({
    success: true,
    totalAmount,
    orders,
  });
});

// get all Orders -- Admin
exports.getAllOrdersStatistical = catchAsyncErrors(async (req, res, next) => {
  // let d = new Date(req.query.dateStart);
  // d.setDate(d.getDate() - 1);
  const orders = await Order.find({
    createdAt: {
      $gte: new Date(req.query.dateStart),
      $lte: new Date(req.query.dateEnd),
    },
  });

  let totalAmount = 0;

  orders.forEach((order) => {
    totalAmount += order.totalPrice;
  });

  res.status(200).json({
    success: true,
    totalAmount,
    orders,
  });
});

// get all status Orders -- Admin
exports.getAllStatusOrders = catchAsyncErrors(async (req, res, next) => {
  const ordersProssesing = await Order.find({ orderStatus: "Processing" });
  const ordersShipped = await Order.find({ orderStatus: "Shipped" });
  const ordersDelivered = await Order.find({ orderStatus: "Delivered" });
  const ordersCancel = await Order.find({ orderStatus: "Canceled" });

  res.status(200).json({
    success: true,
    ordersProssesing,
    ordersShipped,
    ordersDelivered,
    ordersCancel,
  });
});

// update Order Status -- Admin
exports.updateOrder = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return next(new ErrorHander("Đơn hàng không tìm thấy với Id", 404));
  }

  if (order.orderStatus === "Delivered") {
    return next(new ErrorHander("Bạn đã gửi đơn đặt hàng này", 400));
  }

  if (req.body.status === "Shipped") {
    order.orderItems.forEach(async (o) => {
      await updateStock(o.product, o.quantity);
      await updateSold(o.product, o.quantity);
    });
  }
  order.orderStatus = req.body.status;

  if (req.body.status === "Delivered") {
    order.deliveredAt = Date.now();
  }

  await order.save({ validateBeforeSave: false });
  res.status(200).json({
    success: true,
  });
});

async function updateStock(id, quantity) {
  const product = await Product.findById(id);

  product.Stock -= quantity;

  await product.save({ validateBeforeSave: false });
}

async function updateSold(id, quantity) {
  const product = await Product.findById(id);

  product.sold += quantity;

  await product.save({ validateBeforeSave: false });
}

// delete Order -- Admin
exports.deleteOrder = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return next(new ErrorHander("Đơn hàng không tìm thấy với Id", 404));
  }

  await order.remove();

  res.status(200).json({
    success: true,
  });
});
