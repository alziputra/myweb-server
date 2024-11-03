const { BlogPost } = require("../models");

const getAllBlogPosts = async (req, res) => {
  try {
    const AllBlogPosts = await BlogPost.findAll();
    res.status(200).json({
      message: "Successfully retrieved all blog posts",
      data: AllBlogPosts,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to retrieve blog posts",
      error: error.message,
    });
  }
};

const getBlogPostById = async (req, res) => {
  try {
    const blogPost = await BlogPost.findByPk(req.params.id);
    if (!blogPost) {
      return res.status(404).json({
        message: "Blog post not found",
      });
    }
    res.status(200).json({
      message: "Successfully retrieved blog post",
      data: blogPost,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to retrieve blog post",
      error: error.message,
    });
  }
};

const addBlogPost = async (req, res) => {
  const { user_id, title, content } = req.body;

  if (!user_id || !content || !title) {
    return res.status(400).json({
      message: "Fields 'user_id', 'title', and 'content'  are required",
    });
  }

  try {
    const newBlogPost = await BlogPost.create({ user_id, title, content });
    res.status(201).json({
      message: "Blog post added successfully",
      data: newBlogPost,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to add blog post",
      error: error.message,
    });
  }
};

const editBlogPost = async (req, res) => {
  const { id } = req.params;
  const { user_id, title, content } = req.body;

  try {
    const blogPost = await BlogPost.findByPk(id);
    if (!blogPost) {
      return res.status(404).json({
        message: "Blog post not found",
      });
    }

    // Update blog post
    blogPost.user_id = user_id;
    blogPost.title = title;
    blogPost.content = content;
    await blogPost.save();
    res.status(200).json({
      message: "Blog post successfully updated",
      data: blogPost,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to update blog post",
      error: error.message,
    });
  }
};

const deleteBlogPost = async (req, res) => {
  try {
    const deletedBlogPost = await BlogPost.destroy({ where: { id: req.params.id } });
    if (!deletedBlogPost) {
      return res.status(404).json({
        message: "Blog post not found",
      });
    }
    res.status(200).json({
      message: "Blog post successfully deleted",
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete blog post",
      error: error.message,
    });
  }
};

module.exports = {
  getAllBlogPosts,
  getBlogPostById,
  addBlogPost,
  editBlogPost,
  deleteBlogPost,
};
