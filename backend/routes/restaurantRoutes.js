const express = require("express");
const router = express.Router();
const {
    getRestaurants,
    getRestaurantById,
    addRestaurant
} = require("../controllers/restaurantController");
const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

router.get("/", getRestaurants);
router.get("/:id", getRestaurantById);
router.post("/", authMiddleware, adminMiddleware, addRestaurant);

module.exports = router;
