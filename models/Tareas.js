 const Sequelize = require('sequelize');
 const db = require('../config/db');
const { sequelize } = require('./Proyects');
const { sanitizeQuery } = require('express-validator');
const { model } = require('../config/db');
const Proyectos = require('./Proyects');

 const Tareas = db.define('tareas',{
     id: {
         type: Sequelize.INTEGER(11),
         primaryKey: true,
         autoIncrement: true
     },
     tarea: Sequelize.STRING (100),
     estado: Sequelize.INTEGER(1) 
 });


Tareas.belongsTo(Proyectos, {foreignKey: 'proyectoId'}); // referencia fk forzada por obsoleto


module.exports = Tareas;