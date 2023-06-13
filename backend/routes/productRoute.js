const express = require("express");

const {
  getAllProducts,
  createProduct,
  getAdminProducts,
  getProductDetails,
  updateProduct,
  deleteProduct,
  createProductReview,
  getProductReviews,
  deleteReview,
  get8Products,
  getTopProducts,
  getAllReviews,
} = require("../controllers/productController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

const router = express.Router();

router.route("/products").get(getAllProducts);

router.route("/admin/topProducts").get(isAuthenticatedUser, getTopProducts);

router.route("/nProducts").get(get8Products);

router.route("/admin/products").get(getAdminProducts);

router
  .route("/admin/product/new")
  .post(isAuthenticatedUser, authorizeRoles("admin staff"), createProduct);

router
  .route("/admin/product/:id")
  .put(isAuthenticatedUser, authorizeRoles("admin staff"), updateProduct)
  .delete(isAuthenticatedUser, authorizeRoles("admin staff"), deleteProduct);

router.route("/product/:id").get(getProductDetails);

router.route("/review").put(isAuthenticatedUser, createProductReview);

router
  .route("/allReviews")
  .get(isAuthenticatedUser, authorizeRoles("admin staff"), getAllReviews);

router
  .route("/reviews")
  .get(getProductReviews)
  .delete(isAuthenticatedUser, deleteReview);

module.exports = router;
