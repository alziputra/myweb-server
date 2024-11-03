const express = require("express");
const router = express.Router();
const BlogPostController = require("../controllers/BlogPostController");

// Endpoint untuk operasi CRUD BlogPost
router.get("/", BlogPostController.getAllBlogPosts);
router.get("/:id", BlogPostController.getBlogPostById);
router.post("/", BlogPostController.addBlogPost);
router.put("/:id", BlogPostController.editBlogPost);
router.delete("/:id", BlogPostController.deleteBlogPost);

module.exports = router;
