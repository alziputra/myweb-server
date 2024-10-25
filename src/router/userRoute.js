const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');

// Endpoint untuk operasi CRUD User
router.get('/', UserController.getAllUsers);
router.get('/:id', UserController.getUserById);
router.post('/', UserController.addUser);
router.put('/:id', UserController.editUser);
router.delete('/:id', UserController.deleteUser);

module.exports = router;
