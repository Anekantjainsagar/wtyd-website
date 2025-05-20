const express = require("express");
const router = express.Router();
const { protect } = require("../middlewares/authMiddleware");
const Contact = require("../models/Contact");
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

// POST /api/contact
router.post("/contact", async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;

    if (!name || !email || !phone || !message) {
      return res
        .status(400)
        .json({ success: false, error: "All fields are required" });
    }

    const newContact = new Contact({ name, email, phone, message });
    await newContact.save();

    res
      .status(201)
      .json({ success: true, message: "Contact saved successfully" });
  } catch (err) {
    res.status(500).json({ success: false, error: "Server error" });
  }
});

module.exports = router;
