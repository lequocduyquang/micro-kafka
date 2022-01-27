require('dotenv').config()
const kafka = require('../config/kafka.config')

const consumer = kafka.consumer({
    groupId: process.env.KAFKA_GROUP_ID
})

module.exports = consumer