const { Sequelize } = require('sequelize');

var db = new Sequelize('uptask', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    port: 3306,
    operatorsAliases: false,
    define:{
        timestamps: false
    },
    pool: {
      max: 5,
      min: 0,
      idle: 10000
    }
  });

  module.exports = db;