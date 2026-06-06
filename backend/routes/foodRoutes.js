const express = require("express");
const router = express.Router();

const {
    getFoods,
    addFood
} = require("../controllers/foodController");

const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

router.get("/", getFoods);

router.post(
    "/",
    authMiddleware,
    adminMiddleware,
    addFood
);

module.exports = router;