const { Router } = require('express')
const userController = require('../controllers/user.controller')
const authController = require('../controllers/auth.controller')
const { verifyAuth } = require('../middleware/auth.middleware')
const route = Router()

route.get('/ping', (req, res) => {
    res.send('pong')
})

route.post('/register', authController.register)
route.post('/login', authController.login)
route.post('/logout', verifyAuth, authController.logout)

route.get('/users', userController.getUsers)
route.get('/users/:id', userController.getUserById)



module.exports = route