const express = require("express");
const router = express.Router();

const {
    getAllUsers,
    updateUserRole,
    deleteUser
} = require("../controllers/userController");

const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

// All user management routes require admin rights
router.get("/", authMiddleware, adminMiddleware, getAllUsers);
router.put("/:id/role", authMiddleware, adminMiddleware, updateUserRole);
router.delete("/:id", authMiddleware, adminMiddleware, deleteUser);

module.exports = router;
