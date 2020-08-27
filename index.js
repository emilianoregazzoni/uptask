const express = require('express');
const routes = require ('./routes');
const path = require ('path'); // lee el filesystem, archivos carpetas 
// crear app contiene todo lo necesario de express
const app = express();
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const flash = require('connect-flash');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const passport = require('./config/passport');

require('dotenv').config({path: 'variables.env'})

const helpers = require('./helpers');

//Crear conexion
const db = require('./config/db');

// Importando modelo
require('./models/Proyects'); 
require('./models/Tareas');
require('./models/Usuarios');

db.sync() // crea la estructura del proyecto

    .then(() => console.log('Conectado al servidor'))
    .catch(error => console.log(error))

//Donde cargar archivos estaticos
app.use(express.static('public')); 

// Habilitar leer informacion del formulario bodyparser
app.use(bodyParser.urlencoded({extended: true}));

// Habilitar pug
app.set('view engine', 'pug');
// Añadir carpeta vistas
app.set('views',path.join(__dirname, './views')); // lee lo de views

// agregar flash messages
app.use(flash());

app.use(cookieParser());

app.use(session({ // para mantener sesion viva aunque no haga nada, navegar entre paginas
    secret :'super',
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session()); 



// pasar vardump a la app
app.use((req, res, next) => {
    console.log(req.user);
    res.locals.vardump = helpers.vardump; // creo variable local para intercambiar internamente
    res.locals.mensajes = req.flash();
    res.locals.usuario = {...req.user} || null;
    console.log(res.locals.usuario);
    next();
});

// rutas para el home
app.use('/',routes());

//app.listen(3000);

//require('./handlers/email');

// Servidor y puerto para deploy

const host = '0.0.0.0';
const port = process.env.PORT || 3000;

app.listen(port, host, () => {
    console.log('El servidor está funcionando'); 
})

