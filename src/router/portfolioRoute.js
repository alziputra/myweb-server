const express = require("express");
const router = express.Router();
const PortfolioController = require("../controllers/PortfolioController");

// Endpoint untuk operasi CRUD Portfolio
router.get("/", PortfolioController.getAllPortfolios);
router.get("/:id", PortfolioController.getPortfolioById);
router.post("/", PortfolioController.addPortfolio);
router.put("/:id", PortfolioController.editPortfolio);
router.delete("/:id", PortfolioController.deletePortfolio);

module.exports = router;
