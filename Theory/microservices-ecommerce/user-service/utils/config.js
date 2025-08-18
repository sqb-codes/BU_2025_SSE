module.exports = {
    MONGO_USERNAME: process.env.MONGO_USERNAME || 'admin',
    MONGO_PASSWORD: process.env.MONGO_PASSWORD || 'admin',
    MONGO_DB_NAME: process.env.MONGO_DB_NAME || 'userdb',
    PORT: process.env.PORT || 1234,
    JWT_SECRET: process.env.JWT_SECRET
}