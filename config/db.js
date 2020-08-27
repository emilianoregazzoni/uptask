const { Sequelize } = require('sequelize');

// extraer valores del variables.env

require('dotenv').config({path: 'variables.env'})

var db = new Sequelize(process.env.BD_NOMBRE, process.env.BD_USER, process.env.BD_PASS, {
    host: process.env.BD_HOST,
    dialect: 'mysql',
    port:process.env.BD_PORT ,
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