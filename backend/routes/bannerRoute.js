const express = require("express");
const {
  getAllBanners,
  getBannerDetails,
  createBanner,
  updateBanner,
  deleteBanner,
} = require("../controllers/bannerController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

const router = express.Router();

router.route("/banners").get(getAllBanners);

router.route("/banner/:id").get(getBannerDetails);

router
  .route("/admin/banner/new")
  .post(isAuthenticatedUser, authorizeRoles("admin staff"), createBanner);

router
  .route("/admin/banner/:id")
  .get(isAuthenticatedUser, authorizeRoles("admin staff"), getBannerDetails)
  .put(isAuthenticatedUser, authorizeRoles("admin staff"), updateBanner)
  .delete(isAuthenticatedUser, authorizeRoles("admin staff"), deleteBanner);

module.exports = router;
