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
        maxlength: 200,
        required: true,
    },
    price: {
        type: Number,
        min: 0,
        required: true,
    },
    discount: mongoose.Types.ObjectId,
});

ProductScheme.statics.getAll = function(cb){
    return this.find({}, {__v: 0}, cb);
};

const model = mongoose.model('product', ProductScheme);

module.exports = model;