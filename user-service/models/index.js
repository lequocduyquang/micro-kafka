require('dotenv').config()
const dbConfig = require('../config/db.config')

const Sequelize = require('sequelize')
const sequelize = new Sequelize(
    dbConfig.DB,
    dbConfig.USER,
    dbConfig.PASSWORD,
    {
        host: dbConfig.HOST,
        dialect: dbConfig.dialect,
        operatorsAliases: false,
    }
)

const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize
db.sequelize.sync()

db.users = require('./user.model')(sequelize, Sequelize)
db.tokens = require('./token.model')(sequelize, Sequelize)

module.exports = db