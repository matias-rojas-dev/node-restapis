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
    newOrder,
    showOrders,
    showOrderByID,
    updateOrderByID,
    deleteOrder
} = require('../controllers/ordersController');

const {
    newProduct,
    uploadFile,
    showAllProducts,
    showProductByID,
    updateProduct,
    deleteProduct,
    searchProduct
} = require('../controllers/productsController');
const { register, login } = require('../controllers/usersController');



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
    router.post(
        '/productos',
        uploadFile,
        newProduct
    );

    // GET: obtener todos los productos
    router.get('/productos', showAllProducts)

    // GET: obtener un solo producto mediante el ID
    router.get('/productos/:productID', showProductByID)

    // PUT: actualizar un producto
    router.put(
        '/productos/:productID',
        uploadFile,
        updateProduct
    );

    // Realizar una búsqueda de un producto
    router.post('/productos/busqueda/:query', searchProduct)

    // DELETE: eliminar un producto
    router.delete('/productos/:productID', deleteProduct);

    /* PEDIDOS */
    // POST: agregar un nuevo pedido
    router.post('/pedidos/nuevo/:userId', newOrder);

    // GET: mostrar todos los pedidos
    router.get('/pedidos', showOrders);

    // GET: mostrar pedido por ID
    router.get('/pedidos/:orderID', showOrderByID);

    // PUT: actualizar un pedido
    router.put('/pedidos/:orderID', updateOrderByID)

    // DELETE: eliminar un pedido
    router.delete('/pedidos/:orderID', deleteOrder);

    /* USUARIOS */
    // POST: crear una nueva cuenta
    router.post('/crear-cuenta', register);

    // POST: iniciar sesión
    router.post('/iniciar-sesion', login);
    return router;
}