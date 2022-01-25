const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ordersSchema = new Schema({
    client: {
        type: Schema.ObjectID,
        ref: 'Clients'
    },
    products: [{
        product: {
            type: Schema.ObjectID,
            ref: 'Products'
        },
        quantify: Number
    }],
    total: {
        type: Number
    }
})

module.exports = mongoose.model('Orders', ordersSchema)