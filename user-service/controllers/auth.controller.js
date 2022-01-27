const authService = require('../services/auth.service')

exports.register = async (req, res) => {
    try {
        const { password, confirm_password, full_name, email } = req.body
        if (password !== confirm_password) {
            return res.status(400).send({
                message: 'Password not match'
            })
        }
        const user = await authService.register(password, full_name, email)
        res.status(200).send(user)        
    } catch (error) {
        res.status(400).send(error)
    }
}

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body
        const token = await authService.login(password, email)
        res.status(200).json(token)
    } catch (error) {
        res.status(400).send(error)
    }
}

exports.logout = async (req, res) => {
    const user = req["user"];
    const isLogout = await authService.logout(user)

    res.status(200).send({
        message: isLogout ? 'success' : 'not success'
    });
}