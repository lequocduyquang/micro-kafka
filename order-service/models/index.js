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

db.products = require('./product.model')(sequelize, Sequelize)
db.orders = require('./order.model')(sequelize, Sequelize)
db.orderItems = require('./order_item.model')(sequelize, Sequelize)

db.orders.hasMany(db.orderItems, { as: "order_items" });
db.orderItems.belongsTo(db.orders, {
    foreignKey: "order_id",
    as: "orders",
});

module.exports = db