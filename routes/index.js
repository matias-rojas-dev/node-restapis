const express = require('express');
const router = express.Router();

// Controllers
const {
    newClients,
    showClients,
    showClientById,
    updateClient
} = require('../controllers/clientsController');


module.exports = function () {

    // POST: agregar nuevos clientes
    router.post('/clientes', newClients);

    // GET: obtener todos los clientes que estén en la base de datos
    router.get('/clientes', showClients);

    // GET: mostrar un cliente por id
    router.get('/clientes/:idClient', showClientById);

    // PUT: actualizar todo el registro
    router.put('/clientes/:idClient', updateClient)

    return router;
}