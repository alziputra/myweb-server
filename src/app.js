require("dotenv").config();
const cors = require("cors");
const express = require("express");
const morgan = require("morgan");
const path = require("path");
const fileUpload = require("express-fileupload");

const app = express();

// Aktifkan CORS untuk semua origin atau sesuaikan sesuai kebutuhan
app.use(cors());

// Aktifkan middleware file upload untuk menangani form-data
app.use(fileUpload());

// Middleware lainnya
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Untuk menangani URL-encoded data
app.use(morgan("dev"));

// Tambahkan endpoint dinamis untuk mengakses file gambar
app.get("/images/:filename", (req, res) => {
  const filename = req.params.filename;
  const filePath = path.join(__dirname, "uploads", filename);
  res.sendFile(filePath);
});

// Import dan gunakan routes
const router = require("./router/index");
app.use(router); // Aktifkan semua route

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
