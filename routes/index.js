const express = require('express');
const router = express.Router();

// importar express validator

const { body } = require('express-validator/check');

// importar controlador

const proyectsController = require('../controllers/proyectsController');
const tareasController = require('../controllers/tareasController');
const usuariosController = require('../controllers/usuariosController');

const Proyectos = require('../models/Proyects');


module.exports = function () {

    router.get('/',proyectsController.proyectsHome);
    router.get('/nuevo-proyecto',proyectsController.formProyect);

    router.post('/nuevo-proyecto',
    body('nombre').not().isEmpty().trim().escape(),
    proyectsController.newProyect);

    // Listo proyecto
    router.get('/proyectos/:url', proyectsController.proyectoPorUrl);

    //Actualizar proyecto
    router.get('/proyecto/editar/:id', proyectsController.formularioEditar);
    router.post('/nuevo-proyecto/:id', 
    body('nombre').not().isEmpty().trim().escape(), proyectsController.actualizarProyecto);

    //Eliminar proyecto
    router.delete('/proyectos/:url', proyectsController.eliminarProyecto);

    //Tareas 
    router.post('/proyectos/:url', tareasController.agregarTarea);

    // Actualizar tarea
    router.patch('/tareas/:id', tareasController.cambiarEstadoTarea);

    // Eliminar tarea
    router.delete('/tareas/:id', tareasController.eliminarTarea);

    //Crear nueva cuenta
    router.get('/crear-cuenta', usuariosController.formCrearCuenta);

    return router;
}

