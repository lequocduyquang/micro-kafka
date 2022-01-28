module.exports = (sequelize, Sequelize) => {
    const Product = sequelize.define('product', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        title: {
            type: Sequelize.STRING
        },
        description: {
            type: Sequelize.STRING
        },
        image: {
            type: Sequelize.STRING
        },
        price: {
            type: Sequelize.FLOAT,
        },
         // Timestamps
        created_at: Sequelize.DATE,
        updated_at: Sequelize.DATE,
    }, {
        timestamps: false
    })
    return Product
}