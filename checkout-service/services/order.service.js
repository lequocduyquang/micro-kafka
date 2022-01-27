const db = require('../models')
const Order = db.orders
const OrderItem = db.orderItems

const { sendMessage } = require('../kafka/producer')

const createOrder = async (input) => {
    let transaction
    try {
        transaction = await db.sequelize.transaction()
        const order = await Order.create({
            user_id: input.user_id,
            email: input.email,
            status: input.status,
        }, { transaction })

        for (let item of input.items) {
            await OrderItem.create({
                product_title: item.product_title,
                price: item.price,
                quantity: item.quantity,
                order_id: order.id
            }, { transaction });
        }

        await transaction.commit();
        return true
    } catch (error) {
        console.error(`Create order error: ${error}`)
        if(transaction) {
            await transaction.rollback()
            return false
        }
    }
}

const confirmOrder = async (input) => {
    try {
        const orderId = input.order_id
        const order = await Order.findOne({
            where: {
                id: orderId
            }
        })
        if (!order) {
            console.log(`Order not found with id: ${orderId}`)
            return false
        }
        order.status = 2
        await order.save()
        await sendMessage('email_topic', 'orderCompleted', order)

        return true
    } catch (error) {
        console.error(`Confirm order error: ${error}`)
        return false
    }
}

module.exports = {
    createOrder,
    confirmOrder,
}