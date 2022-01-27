module.exports = (sequelize, Sequelize) => {
    const Token = sequelize.define('token', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        user_id: {
            type: Sequelize.INTEGER
        },
        token: {
            type: Sequelize.STRING
        },
         // Timestamps
        created_at: Sequelize.DATE,
        expired_at: Sequelize.DATE,
    }, {
        timestamps: false
    })
    return Token
}