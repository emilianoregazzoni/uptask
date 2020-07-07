const express = require('express');
const router = express.Router();

// importar controlador

const proyectsController = require('../controllers/proyectsController');


module.exports = function () {

    router.get('/',proyectsController.proyectsHome);

    router.get('/nosotros',proyectsController.nosotros);

    return router;
}

