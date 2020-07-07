const express = require('express');
const routes = require ('./routes');
const path = require ('path'); // lee el filesystem, archivos carpetas 
// crear app contiene todo lo necesario de express
const app = express();

//Donde cargar archivos estaticos
app.use(express.static('public')); 

// Habilitar pug
app.set('view engine', 'pug');
// Añadir carpeta vistas
app.set('views',path.join(__dirname, './views')); // lee lo de views

// rutas para el home
app.use('/',routes());

app.listen(3000);