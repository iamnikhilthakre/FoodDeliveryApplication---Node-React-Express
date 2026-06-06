const Order = require("../models/Order");

exports.createOrder = async (req, res) => {
    try {
        const order = await Order.create({
            ...req.body,
            user: req.user.id
        });
        res.status(201).json(order);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getOrders = async (req, res) => {
    try {
        const query = req.user.role === 'admin' ? {} : { user: req.user.id };
        const orders = await Order.find(query)
            .populate("user")
            .populate("items.food");

        res.json(orders);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateOrderStatus = async (req, res) => {
    try {
        const { status } = req.body;
        if (!["Preparing", "Out For Delivery", "Delivered"].includes(status)) {
            return res.status(400).json({ message: "Invalid status specified" });
        }

        const order = await Order.findById(req.params.id);
        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }

        order.status = status;
        await order.save();

        const updatedOrder = await Order.findById(order._id)
            .populate("user")
            .populate("items.food");

        res.json(updatedOrder);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};