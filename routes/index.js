const express = require('express');
const router = express.Router();

// importar express validator

const { body } = require('express-validator/check');

// importar controlador

const proyectsController = require('../controllers/proyectsController');
const tareasController = require('../controllers/tareasController');
const usuariosController = require('../controllers/usuariosController');
const authController = require('../controllers/authController');

const Proyectos = require('../models/Proyects');


// ENDPOINTS

module.exports = function () {

    router.get('/',
        authController.usuarioAutenticado,  // revisa si usuario y si está se pasa al siguiente "asegurar los endpoints"
        proyectsController.proyectsHome);

    router.get('/nuevo-proyecto',
        authController.usuarioAutenticado,
        proyectsController.formProyect);

    router.post('/nuevo-proyecto',
        authController.usuarioAutenticado,
        body('nombre').not().isEmpty().trim().escape(),
        proyectsController.newProyect);

    // Listo proyecto
    router.get('/proyectos/:url',
        authController.usuarioAutenticado,
        proyectsController.proyectoPorUrl);

    //Actualizar proyecto
    router.get('/proyecto/editar/:id', 
        authController.usuarioAutenticado,
        proyectsController.formularioEditar);


    router.post('/nuevo-proyecto/:id', 
        authController.usuarioAutenticado,
        body('nombre').not().isEmpty().trim().escape(), proyectsController.actualizarProyecto);

    //Eliminar proyecto
    router.delete('/proyectos/:url', 
        authController.usuarioAutenticado,
        proyectsController.eliminarProyecto);

    //Tareas 
    router.post('/proyectos/:url', 
        authController.usuarioAutenticado,
        tareasController.agregarTarea);

    // Actualizar tarea
    router.patch('/tareas/:id', 
        authController.usuarioAutenticado,
        tareasController.cambiarEstadoTarea);

    // Eliminar tarea
    router.delete('/tareas/:id',
        authController.usuarioAutenticado,
        tareasController.eliminarTarea);

    //Crear nueva cuenta
    router.get('/crear-cuenta', usuariosController.formCrearCuenta);
    router.post('/crear-cuenta', usuariosController.crearCuenta);
    router.get('/confirmar/:correo',usuariosController.confirmarcuenta);


    router.get('/iniciar-sesion', usuariosController.iniciarSesion);
    router.post('/iniciar-sesion',authController.autenticarUsuario); 

    // cerrar sesion

    router.get('/cerrar-sesion', authController.cerrarSesion);

    // restablecer password

    router.get('/reestablecer', usuariosController.formRestablecerPassword);
    router.post('/reestablecer', authController.enviarToken);
    router.get('/reestablecer/:token', authController.validarToken);
    router.post('/reestablecer/:token',authController.actualizarPassword);

    
    return router;
}

