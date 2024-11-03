const { User } = require("../models");
const { uploadImage, deleteImage } = require("../utils/imageUploadHelper");

// Mengambil semua pengguna
const getAllUsers = async (req, res) => {
  try {
    const allUsers = await User.findAll();
    res.status(200).json({
      message: "Successfully retrieved all users",
      data: allUsers,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to retrieve users",
      error: error.message,
    });
  }
};

// Mengambil pengguna berdasarkan ID
const getUserById = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }
    res.status(200).json({
      message: "Successfully retrieved user",
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to retrieve user",
      error: error.message,
    });
  }
};

// Menambahkan pengguna
const addUser = async (req, res) => {
  const { name, bio, email, password } = req.body;
  let imagePath = null;

  if (!name || !email || !password) {
    return res.status(400).json({
      message: "Fields 'name', 'email', and 'password' are required",
    });
  }

  try {
    if (req.files && req.files.image) {
      imagePath = await uploadImage(req.files.image); // Mengunggah gambar menggunakan helper
    }

    const newUser = await User.create({
      name,
      bio,
      image: imagePath,
      email,
      password,
    });

    res.status(201).json({
      message: "User added successfully",
      data: newUser,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to add user",
      error: error.message,
    });
  }
};

// Mengedit pengguna
const editUser = async (req, res) => {
  const { name, bio, email, password } = req.body;
  const id = req.query.id; // Mengambil ID dari Query Params

  try {
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    if (req.files && req.files.image) {
      if (user.image) {
        deleteImage(user.image);
      }
      user.image = await uploadImage(req.files.image);
    }

    user.name = name || user.name;
    user.bio = bio || user.bio;
    user.email = email || user.email;
    user.password = password || user.password;

    await user.save();

    res.status(200).json({
      message: "User updated successfully",
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to update user",
      error: error.message,
    });
  }
};

// Menghapus pengguna
const deleteUser = async (req, res) => {
  const id = req.query.id; // Mengambil ID dari Query Params

  try {
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    if (user.image) {
      deleteImage(user.image);
    }

    await user.destroy();

    res.status(200).json({
      message: "User successfully deleted",
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete user",
      error: error.message,
    });
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  addUser,
  editUser,
  deleteUser,
};
