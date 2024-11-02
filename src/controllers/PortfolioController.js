const { Portfolio } = require("../models");

// Mengambil semua portofolio
const getAllPortfolios = async (req, res) => {
  try {
    const allPortfolios = await Portfolio.findAll();
    res.status(200).json({
      message: "Successfully retrieved all portfolios",
      data: allPortfolios,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to retrieve portfolios",
      error: error.message,
    });
  }
};

// Mengambil portofolio berdasarkan ID
const getPortfolioById = async (req, res) => {
  try {
    const portfolio = await Portfolio.findByPk(req.params.id);
    if (!portfolio) {
      return res.status(404).json({
        message: "Portfolio not found",
      });
    }
    res.status(200).json({
      message: "Successfully retrieved portfolio",
      data: portfolio,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to retrieve portfolio",
      error: error.message,
    });
  }
};

// Menambahkan portofolio
const addPortfolio = async (req, res) => {
  const { user_id, title, description, image, project_url } = req.body;

  // Validasi input wajib
  if (!user_id || !title || !description || !image || !project_url) {
    return res.status(400).json({
      message: "Fields 'user_id', 'title', 'description', 'image', and 'project_url' are required",
    });
  }

  try {
    const newPortfolio = await Portfolio.create({ user_id, title, description, image, project_url });
    res.status(201).json({
      message: "Portfolio added successfully",
      data: newPortfolio,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to add portfolio",
      error: error.message,
    });
  }
};

// Mengedit portofolio
const editPortfolio = async (req, res) => {
  const { user_id, title, description, image, project_url } = req.body;

  // Validasi input wajib
  if (!user_id || !title || !description || !image || !project_url) {
    return res.status(400).json({
      message: "Fields 'user_id', 'title', 'description', 'image', and 'project_url' are required",
    });
  }

  try {
    const updatedPortfolio = await Portfolio.update({ user_id, title, description, image, project_url }, { where: { id: req.params.id } });
    if (!updatedPortfolio) return res.status(404).json({ error: "Portfolio not found" });
    res.status(200).json({ message: "Portfolio successfully updated" });
  } catch (error) {
    res.status(500).json({ error: "Failed to update portfolio" });
  }
};

// Menghapus portofolio
const deletePortfolio = async (req, res) => {
  try {
    const deletedPortofilio = await Portfolio.destroy({ where: { id: req.params.id } });
    if (!deletedPortofilio) {
      return res.status(404).json({
        message: "Portfolio not found",
      });
    }
    res.status(200).json({
      message: "Portfolio successfully deleted",
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete portfolio",
      error: error.message,
    });
  }
};

module.exports = {
  getAllPortfolios,
  getPortfolioById,
  addPortfolio,
  editPortfolio,
  deletePortfolio,
};
