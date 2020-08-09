const Sequelize = require('sequelize');
const db = require('../config/db');
const slug = require('slug');

const Proyectos = require('../models/Proyects');

const Usuarios = db.define('usuarios',{
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    email: {
        type: Sequelize.STRING(60),
        allowNull: false
    },
    password:{
        type: Sequelize.STRING(60),
        allowNull: false
    }
});

Usuarios.hasMany(Proyectos);

module.exports = Usuarios;