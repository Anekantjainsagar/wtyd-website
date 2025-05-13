const express = require("express");
const router = express.Router();
const { protect } = require("../middlewares/authMiddleware");
const userController = require("../controllers/userController");
const teamController = require("../controllers/User/teamController");
const blogController = require("../controllers/User/blogController");

router
  .route("/me")
  .get(protect, userController.getUserDetails)
  .put(protect, userController.updateUserDetails);

router
  .route("/my-blogs")
  .get(protect, blogController.getAllBlogs)
  .post(protect, blogController.addBlog);
router
  .route("/my-blogs/:id")
  .put(protect, blogController.updateBlog)
  .delete(protect, blogController.deleteBlog);

router.route("/team").get(teamController.getAllMembers);
router.route("/blogs").get(teamController.getAllBlogs);
router.route("/projects").get(teamController.getAllProjects);

module.exports = router;
