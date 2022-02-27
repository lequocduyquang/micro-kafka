const { createClient } = require('redis');

const redisClient = createClient();

redisClient.connect().then(() => console.log('Connected to redis'));

module.exports = redisClient;