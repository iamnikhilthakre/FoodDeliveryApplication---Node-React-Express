const express = require("express");
const router = express.Router();

const {
    getFoods,
    addFood,
    getFeaturedFoods,
    getFoodsByRestaurant,
    searchFoods
} = require("../controllers/foodController");

const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

router.get("/", getFoods);
router.get("/featured", getFeaturedFoods);
router.get("/restaurant/:restaurantId", getFoodsByRestaurant);
router.get("/search", searchFoods);

router.post(
    "/",
    authMiddleware,
    adminMiddleware,
    addFood
);

module.exports = router;