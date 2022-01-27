const userService = require('../services/user.service')

exports.getUsers = async (req, res) => {
    try {
        const users = await userService.findAll()
        res.status(200).send(users)        
    } catch (error) {
        res.status(400).send(error)
    }
}

exports.getUserById = async (req, res) => {
    try {
        const { id } = req.params
        const user = await userService.findById(id)
        res.status(200).send(user)
    } catch (error) {
        res.status(400).send(error)
    }
}