require('dotenv').config()
const kafka = require('../config/kafka.config')

const topic = process.env.KAFKA_TOPIC
const admin = kafka.admin()

const createTopic = async () => {
    try {
        await admin.connect()
        await admin.createTopics({
            topics: [{ 
                topic,
                numPartitions: 1,
                replicationFactor: 3
            }],
            waitForLeaders: true,
        })
    } catch (error) {
        console.error(`Create topic kafka error ${error}`)
        throw new Error(error)
    }
}

module.exports = { createTopic }