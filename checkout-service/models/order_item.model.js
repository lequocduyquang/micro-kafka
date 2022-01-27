module.exports = (sequelize, Sequelize) => {
    const OrderItem = sequelize.define('order_item', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        product_title: {
            type: Sequelize.STRING
        },
        price: {
            type: Sequelize.FLOAT,
        },
        quantity: {
            type: Sequelize.INTEGER,
        },
        order_id: {
            type: Sequelize.INTEGER
        },
         // Timestamps
        created_at: Sequelize.DATE,
        updated_at: Sequelize.DATE,
    }, {
        timestamps: false,
        underscored: true
    })
    return OrderItem
}