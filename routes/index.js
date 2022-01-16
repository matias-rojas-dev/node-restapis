const express = require('express');
const router = express.Router();

// Controllers
const {
    newClients
} = require('../controllers/clientsController');


module.exports = function () {

    // POST: agregar nuevos clientes
    router.post('/clientes', newClients)

    return router;
}