const path = require("path");
const fs = require("fs");

const MAX_FILE_SIZE = 500 * 1024; // Batas ukuran file dalam bytes (500 KB)
const UPLOAD_DIR = path.join(__dirname, "../uploads");

// Fungsi untuk mengunggah file baru
const uploadImage = async (file) => {
  if (file.size > MAX_FILE_SIZE) {
    throw new Error("File size exceeds the 500 KB limit. Please upload a smaller file.");
  }

  const fileExtension = path.extname(file.name);
  const newFileName = `${Date.now()}${fileExtension}`;
  const filePath = path.join(UPLOAD_DIR, newFileName);

  // Pastikan direktori upload ada, jika tidak, buat
  if (!fs.existsSync(UPLOAD_DIR)) {
    fs.mkdirSync(UPLOAD_DIR, { recursive: true });
  }

  // Pindahkan file ke lokasi tujuan dengan nama baru
  await file.mv(filePath);

  return newFileName;
};

// Fungsi untuk menghapus file lama jika ada
const deleteImage = (imageName) => {
  const filePath = path.join(UPLOAD_DIR, imageName);
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
  }
};

module.exports = { uploadImage, deleteImage };
