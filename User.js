const mongoose = require('mongoose');
const Scheme = mongoose.Schema;

const UserScheme = new Scheme({
    email:{
        required: true,
        type: String
    },
    password:{
        required: true,
        type: String
    },
    firstname:{
        required: true,
        type: String
    },
    lastname:{
        required: true,
        type: String
    },
    address:{
        type: String
    }
});

module.exports = require('mongoose').model('user', UserScheme);