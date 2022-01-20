const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductsSchema = new Schema({
    name: {
        type: String,
        trim: true
    },
    price: {
        type: Number,
    },
    img: {
        type: String,
    }
});

module.exports = mongoose.model('Products', ProductsSchema)