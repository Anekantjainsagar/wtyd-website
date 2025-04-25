const express = require("express");
const router = express.Router();
const adminUserControllers = require("../../../controllers/Admin/userAdmin");

router.get("/all", adminUserControllers.getAllUsers);
router.delete("/delete", adminUserControllers.deleteUser);

module.exports = router;
