const nodemailer = require("nodemailer");
require('dotenv').config()

const topic = process.env.KAFKA_TOPIC
const consumer = require('./kafka/consumer')

async function main() {
    let testAccount = await nodemailer.createTestAccount();

    let transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false,
        auth: {
            user: testAccount.user, // generated ethereal user
            pass: testAccount.pass, // generated ethereal password
        },
    });

    try {
        await consumer.connect()
        await consumer.subscribe({
            topic,
            fromBeginning: true,
        })
        console.log('Connect kafka consumer successfully')
        await consumer.run({
            eachMessage: async ({ topic, partition, message }) => {
                console.log('Received message', {
                    topic,
                    partition,
                    key: message.key.toString(),
                    value: message.value.toString()
                })

                const orderInfo = JSON.parse(message.value.toString());
                // send mail with defined transport object
                let info = await transporter.sendMail({
                    from: '"Pegasus" <pegasus@example.com>',
                    to: orderInfo.email, // list of receivers
                    subject: `An order ${orderInfo.id} has been conpleted`,
                    html: `<b>Check your order id ${orderInfo.id}</b>`,
                });

                console.log("Message sent: %s", info.messageId);
                console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
            }
        })
    } catch (error) {
        throw new Error(error)
    }
}

main().catch(console.error);