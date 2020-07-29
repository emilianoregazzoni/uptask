const express = require('express');
const routes = require ('./routes');
const path = require ('path'); // lee el filesystem, archivos carpetas 
// crear app contiene todo lo necesario de express
const app = express();
const bodyParser = require('body-parser');

const helpers = require('./helpers');

//Crear conexion
const db = require('./config/db');

// Importando modelo
require('./models/Proyects'); 
require('./models/Tareas');
db.sync() // crea la estructura del proyecto

    .then(() => console.log('Conectado al servidor'))
    .catch(error => console.log(error))

//Donde cargar archivos estaticos
app.use(express.static('public')); 

// Habilitar pug
app.set('view engine', 'pug');
// Añadir carpeta vistas
app.set('views',path.join(__dirname, './views')); // lee lo de views

// pasar vardump a la app
app.use((req, res, next) => {
    res.locals.vardump = helpers.vardump; // creo variable local para intercambiar internamente
    next();
});


// Habilitar leer informacion del formulario bodyparser
app.use(bodyParser.urlencoded({extended: true}));

// rutas para el home
app.use('/',routes());

app.listen(3000);