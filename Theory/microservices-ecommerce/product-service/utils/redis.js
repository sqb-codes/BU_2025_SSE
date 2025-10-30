const Redis = require("ioredis");

let client;

function setupRedis() {
    if (!client) {
        const url = process.env.REDIS_URL || 'redis://localhost:6379';
        client = new Redis(url, {
            lazyConnect: true,
            maxRetriesPerRequest: 3,         // Add retry limit
            retryStrategy: (times) => {      // Add retry strategy
                const delay = Math.min(times * 50, 2000);
                return delay;
            },
            enableReadyCheck: true,
            connectTimeout: 10000,           // Add connection timeout
        });

        client.on("connect", () => console.log("Redis connected successfully"));
        client.on("error", (err) => console.error("Redis connection error:", err));
        client.on("close", () => console.log("Redis connection closed"));
        client.on("reconnecting", () => console.log("Redis reconnecting..."));

        // Initial connection
        client.connect().catch(err => {
            console.error("Redis initial connection failed:", err.message);
            throw err; // Rethrow to handle it in the calling code
        });
    }
    return client;
}

module.exports = setupRedis;