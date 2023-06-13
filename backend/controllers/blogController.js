const Blog = require("../models/blogModel");
const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apifeatures");
const cloudinary = require("cloudinary");

// Get All Blogs
exports.getAllBlogs = catchAsyncErrors(async (req, res, next) => {
  const resultPerPage = 5;
  const blogsCount = await Blog.countDocuments();

  const apiFeature = new ApiFeatures(Blog.find(), req.query).search();

  let blogs = await apiFeature.query;

  let filteredBlogsCount = blogs.length;

  apiFeature.pagination(resultPerPage);

  blogs = await apiFeature.query;

  res.status(200).json({
    success: true,
    blogs,
    blogsCount,
    resultPerPage,
    filteredBlogsCount,
  });
});

// Get All Blogs (Admin)
exports.getAdminBlogs = catchAsyncErrors(async (req, res, next) => {
  const blogs = await Blog.find().populate("user");

  res.status(200).json({
    success: true,
    blogs,
  });
});

// Get blogs Details
exports.getBlogDetails = catchAsyncErrors(async (req, res, next) => {
  const blog = await Blog.findById(req.params.id).populate("user");

  if (!blog) {
    return next(new ErrorHander("Không tìm thấy tin tức", 404));
  }

  res.status(200).json({
    success: true,
    blog,
  });
});

// Create Blog (Admin)
exports.createBlog = catchAsyncErrors(async (req, res, next) => {
  const myCloud = await cloudinary.v2.uploader.upload(req.body.image, {
    folder: "blogs",
    // width: 150,
    // crop: "scale",
  });
  req.body.user = req.user.id;

  const { name, description, detail, category, user } = req.body;

  const blog = await Blog.create({
    name,
    description,
    detail,
    image: {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    },
    category,
    user,
  });

  res.status(201).json({
    success: true,
    blog,
  });
});

// Update Blog -- Admin
exports.updateBlog = catchAsyncErrors(async (req, res, next) => {
  let blog = await Blog.findById(req.params.id);

  const newBlogData = {
    name: req.body.name,
    desctiption: req.body.desctiption,
    detail: req.body.detail,
    category: req.body.category,
  };

  if (!blog) {
    return next(new ErrorHander("Không tìm thấy tin tức", 404));
  }

  if (req.body.image !== "") {
    const blog = await Blog.findById(req.params.id);

    const imageId = blog.image.public_id;

    await cloudinary.v2.uploader.destroy(imageId);

    const myCloud = await cloudinary.v2.uploader.upload(req.body.image, {
      folder: "blogs",
      // width: 150,
      // crop: "scale",
    });

    newBlogData.image = {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    };
  }

  blog = await Blog.findByIdAndUpdate(req.params.id, newBlogData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    blog,
  });
});

// Delete Blog
exports.deleteBlog = catchAsyncErrors(async (req, res, next) => {
  const blog = await Blog.findById(req.params.id);

  if (!blog) {
    return next(new ErrorHander("Không tìm thấy tin tức", 404));
  }

  const imageId = blog.image.public_id;

  await cloudinary.v2.uploader.destroy(imageId);

  await blog.remove();

  res.status(200).json({
    success: true,
    message: "Xóa thành công tin tức",
  });
});

// Tạo mới bình luận hoặc sửa bình luận
exports.createBlogReview = catchAsyncErrors(async (req, res, next) => {
  const { comment, blogId } = req.body;

  const review = {
    user: req.user._id,
    name: req.user.name,
    comment,
  };

  const blog = await Blog.findById(blogId);

  const isReviewed = blog.reviews.find(
    (rev) => rev.user.toString() === req.user._id.toString()
  );

  if (isReviewed) {
    blog.reviews.forEach((rev) => {
      if (rev.user.toString() === req.user._id.toString())
        rev.comment = comment;
    });
  } else {
    blog.reviews.push(review);
    blog.numOfReviews = blog.reviews.length;
  }

  await blog.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
  });
});

// Lấy tất cả reviews của blog
exports.getBlogReviews = catchAsyncErrors(async (req, res, next) => {
  const blog = await Blog.findById(req.query.id);

  if (!blog) {
    return next(new ErrorHander("Không tìm thấy tin tức", 404));
  }

  res.status(200).json({
    success: true,
    reviews: blog.reviews,
  });
});

// Xóa bình luận
exports.deleteReviewBlog = catchAsyncErrors(async (req, res, next) => {
  const blog = await Blog.findById(req.query.blogId);

  if (!blog) {
    return next(new ErrorHander("Không tìm thấy tin tức", 404));
  }

  const reviews = blog.reviews.filter(
    (rev) => rev._id.toString() !== req.query.id.toString()
  );

  const numOfReviews = reviews.length;

  await Blog.findByIdAndUpdate(
    req.query.blogId,
    {
      reviews,
      numOfReviews,
    },
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );

  res.status(200).json({
    success: true,
  });
});
