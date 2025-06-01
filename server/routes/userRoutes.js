const express = require("express");
const router = express.Router();
const { protect } = require("../middlewares/authMiddleware");
const Contact = require("../models/Contact");
const Appointment = require("../models/Appointment");
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

router.post("/appointment", async (req, res) => {
  try {
    const {
      fullName,
      email,
      phone,
      dogName,
      breed,
      gender,
      date,
      reason,
      agree,
    } = req.body;

    // Validation check
    if (
      !fullName ||
      !email ||
      !phone ||
      !dogName ||
      !breed ||
      !gender ||
      !date ||
      !reason ||
      !agree
    ) {
      return res.status(400).json({
        success: false,
        error: "All fields are required and agreement must be accepted.",
      });
    }

    const newAppointment = new Appointment({
      fullName,
      email,
      phone,
      dogName,
      breed,
      gender,
      date,
      reason,
      agree,
    });

    await newAppointment.save();

    res.status(201).json({
      success: true,
      message: "Appointment booked successfully!",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      error: "Server error",
    });
  }
});

module.exports = router;
