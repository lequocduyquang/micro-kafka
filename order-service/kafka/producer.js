require('dotenv').config()
const kafka = require('../config/kafka.config')

const producer = kafka.producer()

const sendMessage = async (topic, eventName, msg) => {
    try {
        await producer.connect()

        await producer.send({
            topic,
            messages: [{
                key: eventName,
                value: JSON.stringify(msg)
            }]
        })
        console.log(`Send message success: ${JSON.stringify(msg)}`)
    } catch (error) {
        console.error(`Send message kafka error ${error}`)
    }
}

module.exports = { sendMessage }