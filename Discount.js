const mongoose = require('mongoose');
const Scheme = mongoose.Schema;

const DiscountScheme = new Scheme({
    price: {
        type: Number,
        required: true,
        min: 0
    },
    expriresAt: {
        type: Date,
        required: true,
    },
    productID: {
        type: mongoose.Types.ObjectId,
        required: true,
    }
});

const Discount = mongoose.model('discount', DiscountScheme);

module.exports = Discount;