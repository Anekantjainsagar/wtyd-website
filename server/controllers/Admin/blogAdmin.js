const adminBlogService = require("../../services/Admin/blogService");

// GET all blogs - Only for Admin
const getAllBlogs = async (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(401).json({
      success: false,
      error: "Not authorized to access this route",
    });
  }

  try {
    const blogs = await adminBlogService.getAllBlogs();
    res.status(200).json({
      success: true,
      data: blogs,
    });
  } catch (err) {
    next(err);
  }
};

// ADD a new blog - Only for Admin
const addBlog = async (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(401).json({
      success: false,
      error: "Not authorized to access this route",
    });
  }

  try {
    const newBlog = await adminBlogService.addBlog({
      ...req.body,
      author: req.user._id,
      status: "uploaded",
    });
    res.status(201).json({
      success: true,
      data: newBlog,
    });
  } catch (err) {
    next(err);
  }
};

// UPDATE a blog - Only for Admin
const updateBlog = async (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(401).json({
      success: false,
      error: "Not authorized to access this route",
    });
  }

  const blogId = req.params.id;
  if (!blogId) {
    return res.status(400).json({
      success: false,
      error: "Blog ID is required",
    });
  }

  try {
    const updatedBlog = await adminBlogService.updateBlog(blogId, req.body);
    res.status(200).json({
      success: true,
      data: updatedBlog,
    });
  } catch (err) {
    next(err);
  }
};

// DELETE a blog - Only for Admin
const deleteBlog = async (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(401).json({
      success: false,
      error: "Not authorized to access this route",
    });
  }

  const blogId = req.params.id;
  if (!blogId) {
    return res.status(400).json({
      success: false,
      error: "Blog ID is required",
    });
  }

  try {
    const deletedBlog = await adminBlogService.deleteBlog(blogId);
    res.status(200).json({
      success: true,
      data: deletedBlog,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAllBlogs,
  addBlog,
  updateBlog,
  deleteBlog,
};
