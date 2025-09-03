const Order = require("../model/Order");
const Product = require("../../product-service/model/Product");

const placeOrder = async (req, res) => {
    const {userId, products} = req.body;
    try {
        let totalAmount = 0;
        const orderProducts = [];
        for(let i = 0; i < products.length; i++) {
            const product = await Product.findById(products[i].productId);
            if(!product) {
                return res.status(404).json({message: 'Product not found'});
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
        res.status(201).json({message: 'Order placed successfully...', order: newOrder});
    } catch (error) {
        console.log("Error while placing order:",error);
        res.status(500).json({message: 'Failed to place order', error});
    }
}