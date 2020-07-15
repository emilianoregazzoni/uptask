const express = require('express');
const routes = require ('./routes');
const path = require ('path'); // lee el filesystem, archivos carpetas 
// crear app contiene todo lo necesario de express
const app = express();
const bodyParser = require('body-parser');

//Crear conexion
const db = require('./config/db');

// Importando modelo
require('./models/Proyects');
db.sync() // crea la estructura del proyecto

    .then(() => console.log('Conectado al servidor'))
    .catch(error => console.log(error))

//Donde cargar archivos estaticos
app.use(express.static('public')); 

// Habilitar pug
app.set('view engine', 'pug');
// Añadir carpeta vistas
app.set('views',path.join(__dirname, './views')); // lee lo de views

// Habilitar leer informacion del formulario bodyparser
app.use(bodyParser.urlencoded({extended: true}));

// rutas para el home
app.use('/',routes());

app.listen(3000);