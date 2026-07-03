const mongoose = require("mongoose");

const restaurantSchema = new mongoose.Schema({
    name: String,
    image: String,
    address: String,
    rating: Number,
    cuisine: String,
    deliveryTime: String,
    reviews: Number,
    description: String
}, { timestamps: true });

module.exports = mongoose.model("Restaurant", restaurantSchema);