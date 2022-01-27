const { Router } = require('express')
const route = Router()

const orderController = require('../controllers/order.controller')

route.get('/ping', (req, res) => {
    res.send('pong')
})

route.post('/checkout/orders', orderController.createOrder)
route.post('/checkout/orders/confirm', orderController.confirmOrder)

module.exports = route