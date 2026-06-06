const express = require("express");
const router = express.Router();

const {
    createOrder,
    getOrders,
    updateOrderStatus
} = require("../controllers/orderController");

const authMiddleware = require("../middleware/authMiddleware");

router.post("/", authMiddleware, createOrder);
router.get("/", authMiddleware, getOrders);
router.put("/:id/status", authMiddleware, (req, res, next) => {
    if (req.user.role === "admin" || req.user.role === "delivery") {
        next();
    } else {
        res.status(403).json({ message: "Access Denied: Admin or Delivery only" });
    }
}, updateOrderStatus);

module.exports = router;