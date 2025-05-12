const teamService = require("../../services/Admin/teamService");
const adminBlogService = require("../../services/Admin/blogService");

const isValidUser = (user) => user.role === "user";

const getAllMembers = async (req, res, next) => {
  try {
    const members = await teamService.getAllMembers();
    res.status(200).json({ success: true, data: members });
  } catch (err) {
    next(err);
  }
};

const getAllBlogs = async (req, res, next) => {
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

module.exports = { getAllMembers, getAllBlogs };
