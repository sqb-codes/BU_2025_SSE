const Order = require("../model/Order");
const axios = require('axios');
const {publishMessage} = require('../utils/rabbitMQ');
// const Product = require("../../product-service/model/Product");

const placeOrder = async (req, res) => {
    const {userId, products} = req.body;
    try {
        let totalAmount = 0;
        const orderProducts = [];
        for(let i = 0; i < products.length; i++) {
            // const product = await Product.findById(products[i].productId);
            const response = await axios.get(`http://localhost:1235/api/products/${products[i].productId}`);
            const product = response.data;
            if(!product) {
                return res.status(404).json({message: 'Product not found'});
            }
            if(product.stock < products[i].quantity) {
                return res.status(400).json({message: `Insufficient stock for product ${product.name}`});
            }
            const price = product.price * products[i].quantity;
            totalAmount += price;
            orderProducts.push({
                productId: products[i].productId,
                quantity: products[i].quantity,
                price: price
            });
        }
        const newOrder = new Order({
            userId,
            products: orderProducts,
            totalAmount
        });
        await newOrder.save();

        // Publish order to RabbitMQ
        
        await publishMessage('orderQueue', {
            orderId: newOrder._id,
            userId: newOrder.userId,
            products: newOrder.products,
            totalAmount: newOrder.totalAmount
        });

        res.status(201).json({message: 'Order placed successfully...', order: newOrder});
    } catch (error) {
        console.log("Error while placing order:",error);
        res.status(500).json({message: 'Failed to place order', error});
    }
}