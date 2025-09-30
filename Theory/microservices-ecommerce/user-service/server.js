const express = require('express');
const logger = require('./utils/logger');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
const {PORT} = require('./utils/config');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const {connectRabbitMQ, consumeMessage} = require('./utils/rabbitMQ');

connectDB();

app.use(express.json());

async function notifyUser(order) {
  // console.log("User service received order:", order);
  logger.info(`User service received order: ${JSON.stringify(order)}`);
  // Mail to user
}

app.use('/api/auth', authRoutes);


(async () => {
  await connectRabbitMQ();
  consumeMessage('userQueue', notifyUser);
})();

app.listen(PORT, () => {
  // console.log(`User service is running on port ${PORT}`);
  logger.info(`User service is running on port ${PORT}`);
});