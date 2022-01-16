const { request } = require("express");
const Clients = require("../models/Clients")

// Agregar un nuevo cliente
exports.newClients = async (req = request, res, next) => {
    const client = new Clients(req.body);

    try {
        await client.save();
        res.json({
            msg: 'Agregado correctamente'
        })

    } catch (error) {
        res.status(400).send({
            msg: 'Error al agregar el cliente',
            error
        });
        next();
    }
}