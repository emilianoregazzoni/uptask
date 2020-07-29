const Sequelize = require('sequelize');
const db = require('../config/db');
const slug = require('slug');
const shortid = require ('shortid');

const Proyectos = db.define('proyectos',{
    id : {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nombre : Sequelize.STRING,
    url : Sequelize.STRING
},{
    hooks:{
        beforeCreate(proyecto){
            const url = slug(proyecto.nombre).toLowerCase();
            proyecto.url = `${url}-${shortid.generate()}`;
        }
    }
});

module.exports = Proyectos;