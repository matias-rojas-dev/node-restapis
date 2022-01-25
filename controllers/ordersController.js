const Orders = require("../models/Orders")


exports.newOrder = async (req, res, next) => {
    const order = new Orders(req.body);

    try {
        await order.save();
        res.status(200).json({
            ok: true,
            msg: 'Se agregó un nuevo pedido'
        })
    } catch (error) {
        console.log(error);
        next()
    }
}


// Mostrar los pedidos
exports.showOrders = async (req, res, next) => {

    try {
        const orders = await Orders.find({})
            .populate('client') // devuelve todo el campo del cliente que esté asociado a ese ID
            .populate({
                path: 'order.product',
                model: 'Products'
            })
        res.status(200).json({
            ok: true,
            orders
        });
    } catch ({ message }) {
        res.status(400).json({
            ok: false,
            message
        });
        next()
    }
}

// Mostrar un pedido por ID
exports.showOrderByID = async (req, res, next) => {
    const order = await Orders.findById(req.params.orderID)
        .populate('client')
        .populate({
            path: 'order.product',
            model: 'Products'
        });

    if (!order) {
        res.status(400).json({
            ok: false,
            msg: 'Ese pedido no existe'
        });
        return next()
    }

    res.status(200).json({
        ok: true,
        order
    })
}

// Actualizar pedido mediante ID
exports.updateOrderByID = async (req, res, next) => {

    try {
        let order = await Orders.findOneAndUpdate(
            { _id: req.params.orderID },
            req.body,
            { new: true }
        )
            .populate('client')
            .populate({
                path: 'order.product',
                model: 'Products'
            });

        res.status(200).json({
            ok: true,
            order
        })

    } catch (error) {
        res.status(400).json({
            ok: false,
            error
        });
        next()
    }
}