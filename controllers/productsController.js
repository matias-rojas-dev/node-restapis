const Products = require("../models/Products")


exports.newProduct = async (req, res, next) => {
    const product = new Products(req.body);

    console.log(product);

    try {
        await product.save();
        res.status(200).json({
            ok: true,
            msg: 'Producto agregado correctamente'
        })

    } catch (error) {
        console.log(error);
        next()
    }
}