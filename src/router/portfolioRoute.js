const express = require("express");
const router = express.Router();
const PortfolioController = require("../controllers/PortfolioController");

// Rute untuk operasi CRUD Portfolio
router.get("/", (req, res) => {
  if (req.query.id) {
    return PortfolioController.getPortfolioById(req, res);
  }
  return PortfolioController.getAllPortfolios(req, res);
});
router.post("/", PortfolioController.addPortfolio);
router.put("/", PortfolioController.editPortfolio); // Edit juga untuk mendukung query params
router.delete("/", PortfolioController.deletePortfolio); // Delete dengan query params

module.exports = router;
