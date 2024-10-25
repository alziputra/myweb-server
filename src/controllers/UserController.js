const { User } = require("../models");

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
  const { name, bio, image, email, password } = req.body;

  // Validasi input wajib
  if (!name || !email || !password) {
    return res.status(400).json({
      message: "Fields 'name', 'email', and 'password' are required",
    });
  }

  try {
    const newUser = await User.create({ name, bio, image, email, password });
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
  try {
    const [updated] = await User.update(req.body, { where: { id: req.params.id } });
    if (!updated) {
      return res.status(404).json({
        message: "User not found",
      });
    }
    const updatedUser = await User.findByPk(req.params.id);
    res.status(200).json({
      message: "User updated successfully",
      data: updatedUser,
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
  try {
    const deleted = await User.destroy({ where: { id: req.params.id } });
    if (!deleted) {
      return res.status(404).json({
        message: "User not found",
      });
    }
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
