const Sequelize = require('sequelize');
const db = require('../config/db');
const bcrypt = require('bcrypt-nodejs');

const Proyectos = require('../models/Proyects');

const Usuarios = db.define('usuarios',{
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    email: {
        type: Sequelize.STRING(60),
        allowNull: false,
        validate: {
            isEmail: {
                msg: 'Agrega un mail valido'
            },
            notEmpty:{
                msg: 'Debe cargar un mail'
            }    
        },
        unique: {
            args: true,
            msg: 'Usuario ya registrado'
        }
    },
    password:{
        type: Sequelize.STRING(60),
        allowNull: false,
        validate:
                {
              notEmpty:{
                  msg: 'Debe ingresar un password'
              }      
                }
    },
 }, {
        hooks: {
            beforeCreate(usuario){
               usuario.password = bcrypt.hashSync(usuario.password, bcrypt.genSaltSync(10));
            }
        }
});

// metodos propios
Usuarios.prototype.verificarPassword = function(password){
    return bcrypt.compareSync(password, this.password)
}

Usuarios.hasMany(Proyectos);

module.exports = Usuarios;