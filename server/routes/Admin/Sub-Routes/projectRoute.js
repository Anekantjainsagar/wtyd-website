const express = require("express");
const router = express.Router();
const controller = require("../../../controllers/Admin/projectAdmin");

router.get("/all", controller.getAllProjects);
router.post("/add", controller.addProject);
router.put("/update/:id", controller.updateProject);
router.delete("/delete/:id", controller.deleteProject);

module.exports = router;
