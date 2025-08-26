module.exports = {
    MONGO_USERNAME: process.env.MONGO_USERNAME || 'admin',
    MONGO_PASSWORD: process.env.MONGO_PASSWORD || 'admin',
    MONGO_HOST: process.env.MONGO_HOST || 'localhost',
    MONGO_PORT: process.env.MONGO_PORT || '27017',
    MONGO_DB: process.env.MONGO_DB || 'tuemorning_db',
    PORT: process.env.PORT || 3000
}