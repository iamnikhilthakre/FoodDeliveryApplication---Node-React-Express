const mongoose = require("mongoose");

const restaurantSchema = new mongoose.Schema({
    name: String,
    image: String,
    address: String,
    rating: Number
}, { timestamps: true });

module.exports = mongoose.model("Restaurant", restaurantSchema);