const mongoose = require('mongoose');
const Scheme = mongoose.Schema;

const ProductOrder = new Scheme({
    type:{
        type: String,
        enum: ['pizza', 'pasta', 'bread', 'dessert', 'drink'],
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        min: 0,
        required: true,
    },
    qty: {
        type: Number,
        required: true,
    }
});

const OrderScheme = new Scheme({
    createAt: {
        type: Date,
        default: new Date(),
    },
    address:{
        type: String,
        required: true,
    },
    productList:{
        type: [ProductOrder],
        required: true,
    }
});


module.exports = OrderScheme;