const { createClient } = require("redis");

const isRemote = Boolean(process.env.REDIS_HOST && process.env.REDIS_HOST !== "127.0.0.1" && process.env.REDIS_HOST !== "localhost");

const redisConfig = {
    socket: {
        host: process.env.REDIS_HOST || (isRemote ? "redis-15926.c81.us-east-1-2.ec2.cloud.redislabs.com" : "127.0.0.1"),
        port: process.env.REDIS_PORT ? parseInt(process.env.REDIS_PORT) : (isRemote ? 15926 : 6379),
        connectTimeout: 5000,
        reconnectStrategy: (retries) => {
            if (retries > 3) return false;
            return Math.min(retries * 500, 2000);
        }
    },
    disableOfflineQueue: true
};

if (isRemote && process.env.REDIS_KEY) {
    redisConfig.password = process.env.REDIS_KEY;
    redisConfig.username = process.env.REDIS_USERNAME || "default";
}

const redisClient = createClient(redisConfig);

redisClient.on("error", (err) => console.log("Redis Client Error:", err.message));

module.exports = redisClient;
