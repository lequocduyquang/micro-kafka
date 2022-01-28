module.exports = (sequelize, Sequelize) => {
    const Order = sequelize.define('order', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        user_id: {
            type: Sequelize.INTEGER
        },
        email: {
            type: Sequelize.STRING,
        },
        status: {
            type: Sequelize.INTEGER
            /**
             * 1: draft
             * 2: effective
             */
        },
         // Timestamps
        created_at: Sequelize.DATE,
        updated_at: Sequelize.DATE,
    }, {
        timestamps: false,
        underscored: true
    })
    return Order
}