const express = require("express");
const router = express.Router();
const userRoutes = require("./Sub-Routes/userRoute");
const { protect } = require("../../middlewares/authMiddleware");

router.use("/users", protect, userRoutes);

module.exports = router;
