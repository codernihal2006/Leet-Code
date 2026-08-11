const { createClient }  = require('redis');

const redisClient = createClient({
    username: 'default',
    password: process.env.REDIS_KEY,
    socket: {
        host: 'redis-15926.c81.us-east-1-2.ec2.cloud.redislabs.com',
        port: 15926
    }
});

module.exports = redisClient;
