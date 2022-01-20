const express = require('express');
const router = express.Router();

// Controllers
const {
    newClients,
    showClients,
    showClientById,
    updateClient,
    deleteCliente
} = require('../controllers/clientsController');

const {
    newProduct
} = require('../controllers/productsController')


module.exports = function () {

    /* CLIENTES */

    // POST: agregar nuevos clientes
    router.post('/clientes', newClients);

    // GET: obtener todos los clientes que estén en la base de datos
    router.get('/clientes', showClients);

    // GET: mostrar un cliente por id
    router.get('/clientes/:idClient', showClientById);

    // PUT: actualizar todo el registro
    router.put('/clientes/:idClient', updateClient);

    //DELETE: eliminar cliente por ID
    router.delete('/clientes/:idClient', deleteCliente);

    /* PRODUCTOS */
    router.post('/productos', newProduct)

    return router;
}