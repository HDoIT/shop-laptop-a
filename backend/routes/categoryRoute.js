const express = require("express");
const {
  getAllCategories,
  getCategoryDetails,
  createCategory,
  updateCategory,
  deleteCategory,
} = require("../controllers/categoryController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

const router = express.Router();

router.route("/categories").get(getAllCategories);

router.route("/category/:id").get(getCategoryDetails);

router
  .route("/admin/category/new")
  .post(isAuthenticatedUser, authorizeRoles("admin staff"), createCategory);

router
  .route("/admin/category/:id")
  .get(isAuthenticatedUser, authorizeRoles("admin staff"), getCategoryDetails)
  .put(isAuthenticatedUser, authorizeRoles("admin staff"), updateCategory)
  .delete(isAuthenticatedUser, authorizeRoles("admin staff"), deleteCategory);

module.exports = router;
