const express = require("express");
const router = express.Router();
const { protect } = require("../middlewares/authMiddleware");
const userController = require("../controllers/userController");
const teamController = require("../controllers/User/teamController");

router
  .route("/me")
  .get(protect, userController.getUserDetails)
  .put(protect, userController.updateUserDetails);

router.route("/team").get(teamController.getAllMembers);
router.route("/blogs").get(teamController.getAllBlogs);
router.route("/projects").get(teamController.getAllProjects);

module.exports = router;
