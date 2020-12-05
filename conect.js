const Sequelize = require('sequelize');

const sequelize = new Sequelize('****', '****', '****', {
    host: 'remotemysql.com',
    dialect:'mysql',/* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */
    define: {
        timestamps: false
    }
    });


module.exports = sequelize
global.sequelize = sequelize