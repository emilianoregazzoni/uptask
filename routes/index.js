const express = require('express');
const router = express.Router();

// importar express validator

const { body } = require('express-validator/check');

// importar controlador

const proyectsController = require('../controllers/proyectsController');


module.exports = function () {

    router.get('/',proyectsController.proyectsHome);
    router.get('/nuevo-proyecto',proyectsController.formProyect);

    router.post('/nuevo-proyecto',
    body('nombre').not().isEmpty().trim().escape(),
    proyectsController.newProyect);

    return router;
}

