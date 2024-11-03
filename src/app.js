require("dotenv").config();
const express = require("express");
const app = express();
const morgan = require("morgan");
const fileUpload = require("express-fileupload");

// Aktifkan middleware file upload untuk menangani form-data
app.use(fileUpload());

// Middleware lainnya
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Untuk menangani URL-encoded data
app.use(morgan("dev"));

// Import dan gunakan routes
const router = require("./router/index");
app.use(router); // Aktifkan semua route

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
