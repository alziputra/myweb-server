const express = require("express");
const router = express.Router();
const UserController = require("../controllers/UserController");

// Endpoint untuk operasi CRUD User
router.get("/", (req, res) => {
  if (req.query.id) {
    return UserController.getUserById(req, res);
  }
  return UserController.getAllUsers(req, res);
});
router.post("/", UserController.addUser);
router.put("/", UserController.editUser);
router.delete("/", UserController.deleteUser);

module.exports = router;
