const { Portfolio } = require("../models");
const path = require("path");
const fs = require("fs");
const { decodeId, encodeId } = require("../utils/hashIdHelper");

// Mengambil semua portofolio
const getAllPortfolios = async (req, res) => {
  try {
    const allPortfolios = await Portfolio.findAll();
    const portfoliosWithHashedIds = allPortfolios.map((portfolio) => ({
      ...portfolio.toJSON(),
      id: encodeId(portfolio.id),
    }));

    res.status(200).json({
      message: "Successfully retrieved all portfolios",
      data: portfoliosWithHashedIds,
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
  const encryptedId = req.query.id; // Ambil ID terenkripsi dari query parameter
  const id = decodeId(encryptedId); // Dekripsi ID untuk mendapatkan nilai asli

  if (id === null) {
    return res.status(400).json({ message: "Invalid ID format" });
  }

  try {
    // Cari portfolio berdasarkan ID yang sudah didekripsi
    const portfolio = await Portfolio.findByPk(id);
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
  const { user_id, title, description, project_url } = req.body;

  let imagePath = null;
  if (req.files && req.files.image) {
    const file = req.files.image;

    // Cek ukuran file maksimal 500 KB
    if (file.size > 500 * 1024) {
      return res.status(400).json({
        message: "File size exceeds the 500 KB limit. Please upload a smaller file.",
      });
    }

    try {
      // Buat nama file baru berdasarkan timestamp
      const fileExtension = path.extname(file.name); // Ekstensi file asli, misalnya .jpg
      const newFileName = `${Date.now()}${fileExtension}`; // Nama file baru, misalnya 0000111.jpg

      // Tentukan path untuk menyimpan file baru
      const uploadDir = path.join(__dirname, "../uploads");
      imagePath = path.join(uploadDir, newFileName);

      // Pastikan direktori upload ada, jika tidak, buat
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }

      // Pindahkan file ke lokasi tujuan dengan nama baru
      await file.mv(imagePath);

      // Simpan nama file di database
      imagePath = newFileName;
    } catch (error) {
      return res.status(500).json({
        message: "Failed to upload image",
        error: error.message,
      });
    }
  }

  try {
    const newPortfolio = await Portfolio.create({
      user_id,
      title,
      description,
      image: imagePath,
      project_url,
    });

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
  const encryptedId = req.query.id;
  const id = decodeId(encryptedId);

  if (id === null) {
    return res.status(400).json({
      message: "Invalid ID format",
    });
  }

  const { user_id, title, description, project_url } = req.body;

  try {
    const portfolio = await Portfolio.findByPk(id);
    if (!portfolio) {
      return res.status(404).json({
        message: "Portfolio not found",
      });
    }

    if (req.files && req.files.image) {
      const file = req.files.image;

      // Cek ukuran file maksimal 500 KB
      if (file.size > 500 * 1024) {
        return res.status(400).json({
          message: "File size exceeds the 500 KB limit. Please upload a smaller file.",
        });
      }

      try {
        const fileExtension = path.extname(file.name);
        const newFileName = `${Date.now()}${fileExtension}`;
        const uploadDir = path.join(__dirname, "../uploads");
        const newImagePath = path.join(uploadDir, newFileName);

        // Hapus foto lama jika ada
        if (portfolio.image) {
          const oldImagePath = path.join(uploadDir, portfolio.image);
          if (fs.existsSync(oldImagePath)) {
            fs.unlinkSync(oldImagePath); // Hapus foto lama
          }
        }

        // Pastikan direktori upload ada, jika tidak, buat
        if (!fs.existsSync(uploadDir)) {
          fs.mkdirSync(uploadDir, { recursive: true });
        }

        await file.mv(newImagePath);
        portfolio.image = newFileName; // Simpan nama file baru di database
      } catch (error) {
        return res.status(500).json({
          message: "Failed to upload image",
          error: error.message,
        });
      }
    }

    // Update data lainnya
    portfolio.user_id = user_id || portfolio.user_id;
    portfolio.title = title || portfolio.title;
    portfolio.description = description || portfolio.description;
    portfolio.project_url = project_url || portfolio.project_url;

    await portfolio.save();

    res.status(200).json({
      message: "Portfolio updated successfully",
      data: portfolio,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to update portfolio",
      error: error.message,
    });
  }
};

// Menghapus portofolio
const deletePortfolio = async (req, res) => {
  const encryptedId = req.query.id;
  const id = decodeId(encryptedId); // Dekripsi ID untuk mendapatkan ID asli

  console.log("Encrypted ID:", encryptedId);
  console.log("Decrypted ID:", id);

  if (id === null) {
    return res.status(400).json({ message: "Invalid ID format" });
  }

  try {
    const deletedPortfolio = await Portfolio.destroy({ where: { id } });
    if (!deletedPortfolio) {
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
