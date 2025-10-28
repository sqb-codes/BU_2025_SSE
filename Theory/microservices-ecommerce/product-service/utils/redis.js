const Redis = require("ioredis");

let client;

function setupRedis() {
    if(!client) {
        const url = process.env.REDIS_URL || 'redis://localhost:6379';
        client = new Redis(url, {
            lazyConnect: true,
            maxRetriesPerRequest: null,
            enableReadyCheck: true,
        });
        client.on("connect", () => console.log("Redis connected"));
        client.on("error", (err) => console.error("Failed to connect Redis",err));
        client.connect().catch(err => {
            console.error("Redis connection failed :",err.message);
        });
    }
    return client;
}