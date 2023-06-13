const express = require("express");
const {
  newOrder,
  getSingleOrder,
  myOrders,
  getAllOrders,
  updateOrder,
  deleteOrder,
  getAllOrdersStatistical,
  getAllStatusOrders,
} = require("../controllers/orderController");
const router = express.Router();

const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

router.route("/order/new").post(newOrder);

router.route("/order/:id").get(isAuthenticatedUser, getSingleOrder);

router.route("/orders/me").get(isAuthenticatedUser, myOrders);

router
  .route("/admin/orders")
  .get(isAuthenticatedUser, authorizeRoles("admin staff"), getAllOrders);

router
  .route("/admin/ordersStatistical")
  .get(
    isAuthenticatedUser,
    authorizeRoles("admin staff"),
    getAllOrdersStatistical
  );

router
  .route("/admin/ordersStatus")
  .get(isAuthenticatedUser, authorizeRoles("admin staff"), getAllStatusOrders);

router
  .route("/admin/order/:id")
  .put(isAuthenticatedUser, authorizeRoles("admin staff"), updateOrder)
  .delete(isAuthenticatedUser, authorizeRoles("admin staff"), deleteOrder);

module.exports = router;
