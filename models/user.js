const Sequelize = require('sequelize')

module.exports = sequelize.define(
    "Users",
    {
        id: {
            type:Sequelize.INTEGER(11),
            allowNull:false,
            autoIncrement:true,
            primaryKey:true
        },
        email:Sequelize.STRING,
        username:Sequelize.STRING,
        password:Sequelize.STRING,
        bio:Sequelize.TEXT

    }

)
