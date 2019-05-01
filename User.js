const mongoose = require('mongoose');
const Scheme = mongoose.Schema;

const UserScheme = new Scheme({
    email:{
        required: true,
        type: String
    },
    password:{
        required: function() {
            return !this.googleID
        },
        type: String
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
        type: String
    },
    picture: {
        type: String
    }
});

module.exports = require('mongoose').model('user', UserScheme);