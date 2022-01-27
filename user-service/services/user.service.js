const db = require('../models')
const User = db.users

const findAll = async () => {
    try {
        return await User.findAll()
    } catch (error) {
        console.error(`Find all users error: ${error}`)
        throw new Error(error.message)
    }
}

const findById = async (id) => {
    try {
        return await User.findOne({
            where: { id }
        })
    } catch (error) {
        console.error(`Find user by id error: ${error}`)
        throw new Error(error.message)
    }
}

module.exports = {
    findAll,
    findById
}