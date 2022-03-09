const Products = require("../models/Products");
const multer = require("multer");
const multerConfig = require("../helpers/multerConfig");

const upload = multer(multerConfig).single('img');

// Agregar productos
exports.newProduct = async (req, res, next) => {
    const product = new Products(req.body)

    try {
        if (req.file.filename) {
            product.img = req.file.filename
        }
        await product.save();
        res.status(200).json({
            ok: true,
            msg: 'Producto agregado correctamente'
        })

    } catch (error) {
        res.status(404).send({
            msg: 'Error al agregar un producto',
            error
        });
        next()
    }
};

// Subir imagenes de los productos
exports.uploadFile = (req, res, next) => {
    upload(req, res, function (error) {
        if (error) {
            res.status(400).json({
                ok: false,
                msg: 'Ha ocurrido un error',
                error
            })
        }
        return next()
    })
}

// Mostrar todos los productos
exports.showAllProducts = async (req, res, next) => {
    try {
        const products = await Products.find({});
        res.status(200).json({
            ok: true,
            products
        })
    } catch (error) {
        res.status(404).send({
            msg: 'Error al mostrar todos los productos',
            error
        });
        next()
    }
}

// Mostrar producto por ID
exports.showProductByID = async (req, res, next) => {

    const product = await Products.findById(req.params.productID)

    if (!product) {
        res.status(400).json({
            ok: false,
            msg: 'El producto no existe'
        })
        return next();
    }

    res.status(200).json({
        ok: true,
        product
    })

}

// Actualizar un producto
exports.updateProduct = async (req, res, next) => {
    try {

        let lastProduct = await Products.findById(req.params.productID);
        // construir un nuevo producto
        let newProduct = req.body;

        if (req.file) {
            newProduct.img = req.file.filename
        } else {
            newProduct.img = lastProduct.img
        }

        let product = await Products.findOneAndUpdate(
            { _id: req.params.productID },
            newProduct,
            { new: true }
        );

        res.status(200).json({
            ok: true,
            product
        })
    } catch ({ message }) {
        res.status(400).json({
            ok: false,
            message
        });
        next()
    }
}

// Eliminar un producto
exports.deleteProduct = async (req, res, next) => {
    try {
        const product = await Products.findOneAndDelete({
            _id: req.params.productID
        });

        res.status(200).json({
            ok: true,
            msg: 'Producto eliminado correctamente',
            product
        })

    } catch ({ message }) { // const {message} = error
        res.status(400).json({
            ok: false,
            msg: 'Error al borrar el product',
            message
        })
        next()
    }
}

exports.searchProduct = async (req, res, next) => {
    try {
        const { query } = req.params;
        const product = await Products.find({ name: new RegExp(query, 'i') });
        res.json(product)
    } catch (error) {
        console.log(error);
        next();
    }
}