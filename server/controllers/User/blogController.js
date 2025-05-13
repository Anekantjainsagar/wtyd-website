const blogServices = require("../../services/User/blogService");

const isVerified = (user) => user.role === "user";

const getAllBlogs = async (req, res, next) => {
  if (!isVerified(req.user))
    return res.status(401).json({ success: false, error: "Not authorized" });

  try {
    const blogs = await blogServices.getAllBlogs(req.user._id);
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
  if (!isVerified(req.user))
    return res.status(401).json({ success: false, error: "Not authorized" });

  try {
    const newBlog = await blogServices.addBlog({
      ...req.body,
      author: req.user._id,
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
  if (!isVerified(req.user))
    return res.status(401).json({ success: false, error: "Not authorized" });

  const blogId = req.params.id;
  if (!blogId) {
    return res.status(400).json({
      success: false,
      error: "Blog ID is required",
    });
  }

  try {
    const updatedBlog = await blogServices.updateBlog(blogId, req.body);
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
  if (!isVerified(req.user))
    return res.status(401).json({ success: false, error: "Not authorized" });

  const blogId = req.params.id;
  if (!blogId) {
    return res.status(400).json({
      success: false,
      error: "Blog ID is required",
    });
  }

  try {
    const deletedBlog = await blogServices.deleteBlog(blogId);
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
