const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const db = require('../models')
const User = db.users
const Token = db.tokens

const register = async (password, full_name, email) => {
    try {
        const user = await User.create({
            full_name,
            email,
            password: await bcrypt.hash(password, 10)
        })
        delete user.password
        return user
    } catch (error) {
        console.error(`register user error: ${error}`)
        throw new Error(error.message)
    }
}

const login = async (password, email) => {
    try {
        const user = await User.findOne({
            where: {
                email
            },
        })
        if (!await bcrypt.compare(password, user.password)) {
            throw new Error("Password not match")
        }
        const token = jwt.sign({
            id: user.id,
        }, process.env.SECRET_KEY)

        const expiredDate = new Date()
        expiredDate.setDate(expiredDate.getDate() + 1)

        await Token.create({
            user_id: user.id,
            token,
            expired_at: expiredDate
        })
        return token 
    } catch (error) {
        console.error(`login user error: ${error}`)
        throw new Error(error.message)
    }
}

const logout = async (user) => {
    try {
        const isSuccess = await Token.destroy({
            where: {
                user_id: user.id
            }
        })
        return isSuccess
    } catch (error) {
        console.error(`logout user error: ${error}`)
        throw new Error(error.message)
    }
}

module.exports = {
    register,
    login,
    logout,
}