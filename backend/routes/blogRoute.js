const express = require("express");
const {
  getAllBlogs,
  getBlogDetails,
  createBlog,
  updateBlog,
  deleteBlog,
  createBlogReview,
  deleteReviewBlog,
  getBlogReviews,
  getAdminBlogs,
} = require("../controllers/blogController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

const router = express.Router();

router.route("/blogs").get(getAllBlogs);

router.route("/admin/blogs").get(getAdminBlogs);

router.route("/blog/:id").get(getBlogDetails);

router
  .route("/admin/blog/new")
  .post(isAuthenticatedUser, authorizeRoles("admin staff"), createBlog);

router
  .route("/admin/blog/:id")
  .get(isAuthenticatedUser, authorizeRoles("admin staff"), getBlogDetails)
  .put(isAuthenticatedUser, authorizeRoles("admin staff"), updateBlog)
  .delete(isAuthenticatedUser, authorizeRoles("admin staff"), deleteBlog);

router.route("/blogReview").put(isAuthenticatedUser, createBlogReview);

router
  .route("/blogReviews")
  .get(getBlogReviews)
  .delete(isAuthenticatedUser, deleteReviewBlog);

module.exports = router;
