const router = express.Router();
const express = require("express");
const Contact = require("../../models/Contact");
const userRoutes = require("./Sub-Routes/userRoute");
const blogRoutes = require("./Sub-Routes/blogRoute");
const teamRoutes = require("./Sub-Routes/teamRoute");
const projectRoutes = require("./Sub-Routes/projectRoute");
const { protect } = require("../../middlewares/authMiddleware");

router.use("/users", protect, userRoutes);
router.use("/blogs", protect, blogRoutes);
router.use("/projects", protect, projectRoutes);
router.use("/team", protect, teamRoutes);

// GET /api/contact
router.get("/contact", protect, async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: contacts });
  } catch (err) {
    res.status(500).json({ success: false, error: "Server error" });
  }
});

module.exports = router;
