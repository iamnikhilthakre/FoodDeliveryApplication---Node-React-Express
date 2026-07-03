const Food = require("../models/Food");

exports.getFoods = async (req, res) => {
    try {
        const foods = await Food.find().populate("restaurant");
        res.json(foods);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getFeaturedFoods = async (req, res) => {
    try {
        const foods = await Food.find({ isFeatured: true }).populate("restaurant");
        res.json(foods);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getFoodsByRestaurant = async (req, res) => {
    try {
        const { restaurantId } = req.params;
        const foods = await Food.find({ restaurant: restaurantId }).populate("restaurant");
        res.json(foods);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.searchFoods = async (req, res) => {
    try {
        const { q } = req.query;
        const foods = await Food.find({ 
            $or: [
                { name: { $regex: q, $options: 'i' } },
                { description: { $regex: q, $options: 'i' } }
            ]
        }).populate("restaurant");
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