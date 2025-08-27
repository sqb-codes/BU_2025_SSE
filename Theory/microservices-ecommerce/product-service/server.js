const express = require('express');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
const {PORT} = require('./utils/config');
const connectDB = require('./config/db');
const productRoutes = require('./routes/authRoutes');

connectDB();

app.use(express.json());

app.use('/api/producrs', productRoutes);


app.listen(PORT, () => {
  console.log(`Product service is running on port ${PORT}`);
});