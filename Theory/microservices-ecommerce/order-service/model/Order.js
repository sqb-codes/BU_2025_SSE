const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User", 
        required: true
    },
    products: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId, 
                ref: "Product", 
                required: true
            },
            quantity: {type: Number, required: true},
            price: {type: Number, required: true}
        }
    ],
    totalAmount: {type: Number, required: true},
    status: {
        type: String, 
        enum: ["Pending", "Shipped", "Delivered", "Cancelled", "Out for Delivery"],
        default: "Pending"
    },
    orderDate: {type: Date, default: Date.now}
});

module.exports = mongoose.model("Order", orderSchema);