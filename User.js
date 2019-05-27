const mongoose = require('mongoose');
const Scheme = mongoose.Schema;

const OrderScheme = require('./Order');

const UserScheme = new Scheme({
    email:{
        required: true,
        type: String
    },
    password:{
        required: function() {
            return !this.googleID;
        },
        type: String,
        select: false,
    },
    firstname:{
        required: true,
        type: String
    },
    lastname:{
        type: String
    },
    address:{
        type: String
    },
    googleID: {
        type: String,
        required: function() {
            return !this.password;
        },
        select: false
    },
    picture: {
        type: String
    },
    admin:{
        default: false,
        type: Boolean
    },
    orders:{
        type:[OrderScheme],
        default:[],
    }
});

UserScheme.index({email: 1});

module.exports = require('mongoose').model('user', UserScheme);