const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const jwt = require('jsonwebtoken');

const User = require('./User');
const secretKey = require('./config').secretKey;

router.get('/', verifyToken, (req, res) => {
    res.json(res.locals.userData);
});

router.post('/create', (req, res) => {
    const newUser = new User({
        email: req.body.Email,
        password: req.body.Password,
        firstname: req.body.Firstname,
        lastname: req.body.Lastname,
        ...(req.body.Address && {address: req.body.Address}),
    });
    newUser.save().then(user => {
        jwt.sign({user}, secretKey, (err, token) => {
            if(err) throw err;
            res.json({token});
        })
    });
});

router.post('/login',(req, res) => {
    User.findOne({email: req.body.Email, password: req.body.Password}, (err, user) => {
        if(err) throw err;
        if(user){
            jwt.sign({user}, secretKey, (err, token) => {
                if(err) throw err;
                res.json({token});
            })
        }else{
            res.status(404).json({
                error: 'Username or Email is incorrect'
            });
        }
    });
});

function verifyToken(req, res, next) {
    const bearerHeader = req.headers['authorization'];
    if(typeof bearerHeader !== 'undefined'){
        const token = bearerHeader.split(' ')[1];
        jwt.verify(token, secretKey, (err, authData) => {
            if(err){
                res.sendStatus(403);
            }else{
                res.locals.userData = authData;
                next();
            }
        });
    }else{
        res.sendStatus(403);
    }
}

module.exports = router;