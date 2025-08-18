const express = require('express');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
const {PORT} = require('./utils/config');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');

connectDB();

app.use(express.json());

app.use('/api/auth', authRoutes);


app.listen(PORT, () => {
  console.log(`User service is running on port ${PORT}`);
});