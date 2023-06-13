const express = require("express");
const {
  myWishlist,
  getWishlistDetails,
  createWishlist,
  addWishlistItem,
  wishlistDeleteItem,
} = require("../controllers/wishlistController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

const router = express.Router();

router.route("/wishlist").get(isAuthenticatedUser, myWishlist);

router.route("/wishlist/:id").get(isAuthenticatedUser, getWishlistDetails);

router.route("/wishlist/new").post(isAuthenticatedUser, createWishlist);

router.route("/wishlist").post(isAuthenticatedUser, addWishlistItem);

router
  .route("/wishlist/:itemId")
  .delete(isAuthenticatedUser, wishlistDeleteItem);

// router
//   .route("/cart/:id")
//   .put(isAuthenticatedUser, updateCart)
//   .delete(isAuthenticatedUser, deleteCart);

module.exports = router;
