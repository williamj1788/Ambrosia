const mongoose = require('mongoose');
const Scheme = mongoose.Schema;

const ProductScheme = new Scheme({
    type:{
        type: String,
        enum: ['pizza', 'pasta', 'bread', 'dessert', 'drink'],
        require: true,
    },
    picture: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    }
});
module.exports = require('mongoose').model('product', ProductScheme);