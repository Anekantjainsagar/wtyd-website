const express = require("express");
const router = express.Router();
const userRoutes = require("./Sub-Routes/userRoute");
const blogRoutes = require("./Sub-Routes/blogRoute");
const { protect } = require("../../middlewares/authMiddleware");

router.use("/users", protect, userRoutes);
router.use("/blogs", protect, blogRoutes);

module.exports = router;
