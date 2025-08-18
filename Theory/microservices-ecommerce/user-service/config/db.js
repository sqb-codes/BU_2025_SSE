const mongoose = require('mongoose');
const { MONGO_USERNAME, MONGO_PASSWORD, MONGO_DB_NAME } = require('../utils/config');

// const MONGO_URI = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@cluster0.zxvoo.mongodb.net/${MONGO_DB_NAME}?retryWrites=true&w=majority&appName=Cluster0`;

// mongodb+srv://admin:<db_password>@cluster0.zxvoo.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0

const MONGO_URI = `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@mongo-db:27017/${MONGO_DB_NAME}?authSource=admin`;

const connectDB = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.log('MongoDB connected failed:', error);
    }
}

module.exports = connectDB;