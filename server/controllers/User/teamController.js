const teamService = require("../../services/Admin/teamService");
const adminBlogService = require("../../services/Admin/blogService");
const projectService = require("../../services/Admin/projectService");

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
    const blogs = await adminBlogService.getAllBlogs(true);
    res.status(200).json({
      success: true,
      data: blogs,
    });
  } catch (err) {
    next(err);
  }
};

const getAllProjects = async (req, res, next) => {
  try {
    const projects = await projectService.getAllProjects();
    res.status(200).json({ success: true, data: projects });
  } catch (err) {
    next(err);
  }
};

module.exports = { getAllMembers, getAllBlogs, getAllProjects };
