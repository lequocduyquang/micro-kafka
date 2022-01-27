const orderService = require('../services/order.service')
const producer = require('../kafka/producer')

exports.createOrder = async (req, res) => {
    try {
        const isCreated = await orderService.createOrder(req.body)
        res.status(200).send({
            status: isCreated
        })        
    } catch (error) {
        res.status(400).send(error)
    }
}

exports.confirmOrder = async (req, res) => {
    try {
        const isConfirmed = await orderService.confirmOrder(req.body)
        res.status(200).send({
            status: isConfirmed
        })
    } catch (error) {
        res.status(400).send(error)
    }
}