'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("Users",{
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
  })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Users')
  }
};
