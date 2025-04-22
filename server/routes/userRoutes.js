const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { protect } = require("../middlewares/authMiddleware");

router
  .route("/me")
  .get(protect, userController.getUserDetails)
  .put(protect, userController.updateUserDetails);

module.exports = router;
