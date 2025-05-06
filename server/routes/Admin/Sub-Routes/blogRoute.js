const express = require("express");
const router = express.Router();
const adminBlogController = require("../../../controllers/Admin/blogAdmin");

router.delete("/add", adminBlogController.addBlog);
router.get("/all", adminBlogController.getAllBlogs);
router.put("/update", adminBlogController.updateBlog);
router.post("/delete", adminBlogController.deleteBlog);

module.exports = router;
