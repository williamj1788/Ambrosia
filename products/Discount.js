const mongoose = require('mongoose');
const Scheme = mongoose.Schema;

const DiscountScheme = new Scheme({
    price: {
        type: Number,
        required: true,
        min: 0
    },
    expiresAt: {
        type: Date,
        required: true,
    },
    productID: {
        type: mongoose.Types.ObjectId,
        required: true,
    }
});

DiscountScheme.index({expiresAt: 1}, {expireAfterSeconds: 0});

const Discount = mongoose.model('discount', DiscountScheme);

module.exports = Discount;