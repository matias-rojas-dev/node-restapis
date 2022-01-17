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

// Mostrar todos los clientes de la base de datos
exports.showClients = async (req, res, next) => {
    try {
        const clients = await Clients.find({});
        res.json(clients)
    } catch (error) {
        console.log(error);
        next()
    }
};

// Mostrar cliente por id
exports.showClientById = async (req, res, next) => {
    const client = await Clients.findById(req.params.idClient);

    if (!client) {
        res.status(400).json({
            ok: false,
            msg: 'Cliente no existe',
        })
        next();
    }

    res.status(400).json({
        ok: true,
        client,
    })
}

// Actualizar cliente por su ID
exports.updateClient = async (req, res, next) => {
    try {
        const client = await Clients.findOneAndUpdate(
            { _id: req.params.idClient },
            req.body,
            { new: true }
        );

        res.json(client)
    } catch (error) {
        console.log(error)
    }
}