const Food = require("../models/Food");

exports.getFoods = async (req, res) => {
    try {
        const foods = await Food.find().populate("restaurant");
        res.json(foods);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


exports.addFood = async (req, res) => {
    try {
        const food = await Food.create(req.body);

        res.status(201).json(food);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}