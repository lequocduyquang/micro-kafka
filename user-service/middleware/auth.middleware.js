const jwt = require('jsonwebtoken')
const db = require('../models')
const { Op } = db.Sequelize;
const User = db.users
const Token = db.tokens

exports.verifyAuth = async (req, res, next) => {
    const token =
        req.body.token || req.query.token || req.headers["x-access-token"];

    if (!token) {
        return res.status(403).send("A token is required");
    }
    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        const user = await User.findOne({
            id: decoded.id
        })
        const userToken = await Token.findOne({
            user_id: user.id,
            expired_at: {
                [Op.gte]: new Date()
            }
        })
        if (!userToken) {
            return res.status(401).send({
                message: 'Not authenticated'
            });
        }
        req.user = decoded;
    } catch (error) {
        return res.status(401).send({
            message: 'Invalid token'
        })
    }
    return next()
}