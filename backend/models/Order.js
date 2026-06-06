const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },

    items: [
        {
            food: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Food"
            },
            quantity: Number
        }
    ],

    totalPrice: Number,

    address: String,

    status: {
        type: String,
        enum: [
            "Preparing",
            "Out For Delivery",
            "Delivered"
        ],
        default: "Preparing"
    }
}, { timestamps: true });

module.exports = mongoose.model("Order", orderSchema);