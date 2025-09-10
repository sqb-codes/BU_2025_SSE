const express = require('express');
const orderController = require('../controller/orderController');

const router = express.Router();

// Create a new order
router.post('/', orderController.placeOrder);

// Get all orders
// router.get('/', orderController.getAllOrders);

// Get a single order by ID
// router.get('/:id', orderController.getOrderById);

// Update an order by ID
// router.put('/:id', orderController.updateOrder);

// Delete an order by ID
// router.delete('/:id', orderController.deleteOrder);

module.exports = router;