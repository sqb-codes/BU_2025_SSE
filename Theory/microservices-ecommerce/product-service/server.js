const express = require('express');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
const {PORT} = require('./utils/config');
const connectDB = require('./config/db');
const productRoutes = require('./routes/productRoutes');
const {connectRabbitMQ, consumeMessage} = require('./utils/rabbitMQ');

connectDB();

app.use(express.json());

app.use('/api/products', productRoutes);

async function processOrder(order) {
  console.log("Product service received order:", order);
  for(let item of order.products) {
    const product = await Product.findById(item.productId);
    if(!product) {
      continue;
    }
    product.stock -= item.quantity;
    await product.save();
    console.log(`Updated stock for product ${product.name}: ${product.stock}`);
  }
}

// IIFE to setup RabbitMQ connection and start consuming messages
(async () => {
  await connectRabbitMQ();
  await consumeMessage('orderQueue', processOrder);
})();

app.listen(PORT, () => {
  console.log(`Product service is running on port ${PORT}`);
});