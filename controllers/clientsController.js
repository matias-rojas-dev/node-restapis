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
        res.send({
            error,
            msg: 'El correo ya se encuentra registrado'
        })
        next();
    }
}

// Mostrar todos los clientes de la base de datos
exports.showClients = async (req, res, next) => {
    try {
        const clients = await Clients.find({});
        res.json(clients)
    } catch (error) {
        res.status(404).send({
            msg: 'Error al mostrar los clientes',
            error
        }); next()
    }
};

// Mostrar cliente por id
exports.showClientById = async (req, res, next) => {
    const client = await Clients.findById(req.params.idClient);

    if (!client) {
        res.json({
            ok: false,
            msg: 'Cliente no existe',
        })
        next();
    }

    res.status(200).json({
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

        res.json({
            ok: true,
            msg: 'Cliente actualizado correctamente'
        })
    } catch (error) {
        res.status(404).send({
            msg: 'Error al actualizar el cliente',
            error
        });
        next();
    }
};

// Elominar cliente por ID
exports.deleteCliente = async (req, res, next) => {
    try {
        await Clients.findOneAndDelete({
            _id: req.params.idClient
        });
        res.json({
            ok: true,
            msg: 'Cliente eliminado correctamente'
        })
    } catch ({ message }) { // const {message} = error
        res.status(400).json({
            ok: false,
            msg: 'Error al borrar al cliente',
            message
        })
        next()
    }
}