const express = require("express");
const router = express.Router();
const controller = require("../../../controllers/Admin/teamAdmin");

router.get("/all", controller.getAllMembers);
router.post("/add", controller.addMember);
router.put("/update/:id", controller.updateMember);
router.delete("/delete/:id", controller.deleteMember);

module.exports = router;
