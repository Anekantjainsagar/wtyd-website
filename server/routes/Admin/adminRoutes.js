const express = require("express");
const router = express.Router();
const userRoutes = require("./Sub-Routes/userRoute");
const blogRoutes = require("./Sub-Routes/blogRoute");
const projectRoutes = require("./Sub-Routes/projectRoute");
const teamRoutes = require("./Sub-Routes/teamRoute");
const { protect } = require("../../middlewares/authMiddleware");

router.use("/users", protect, userRoutes);
router.use("/blogs", protect, blogRoutes);
router.use("/projects", protect, projectRoutes);
router.use("/team", protect, teamRoutes);

module.exports = router;
