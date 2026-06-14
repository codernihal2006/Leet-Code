const { createClient }  = require('redis');

const redisClient = createClient({
    username: 'default',
    password: process.env.REDIS_KEY,
    socket: {
        //host: 'redis-19934.c212.ap-south-1-1.ec2.redns.redis-cloud.com',
        //port: 19934
        host: 'redis-11100.c85.us-east-1-2.ec2.cloud.redislabs.com',
        port: 11100
    }
});

module.exports = redisClient;