const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const User = require('./User');
const secretKey = require('./config').secretKey;

router.get('/', verifyToken, (req, res) => {
    const UserID = res.locals.payload.UserID;
    const projection = {_id: 0, password: 0, __v: 0};

    User.findById(UserID, projection, (err, user) => {
        if(err) throw err;
        if(user){
            return res.json(user);
        }
        res.sendStatus(404);
    });
});

router.post('/create', (req, res) => {
    User.findOne({email: req.body.Email}, async (err, user) => {
        if(err) throw err
        if(!user){
            const newUser = await createUser(req.body);
            newUser.save().then(user => {
                signTokenWithUser(user, res);
            });
        }else{
            res.status(400).json({
                message: 'There is already an account with this email'
            });
        }
    });
});

router.post('/login',(req, res) => {
    User.findOne({email: req.body.Email}, (err, user) => {
        if(err) throw err;
        if(user){
            bcrypt.compare(req.body.Password, user.password, (err, isValidUser) => {
                if(err) throw err;
                if(isValidUser){
                    signTokenWithUser(user, res);
                }else{
                    res.status(404).json({
                        error: 'Email or Password is incorrect'
                    });
                }
            });
        }else{
            res.status(404).json({
                error: 'Email or Password is incorrect'
            });
        }
    });
});

// Middleware Functions

function verifyToken(req, res, next) {
    const bearerHeader = req.headers['authorization'];
    if(typeof bearerHeader !== 'undefined'){
        const token = bearerHeader.split(' ')[1];
        jwt.verify(token, secretKey, (err, payload) => {
            if(err){
                res.sendStatus(403);
            }else{
                res.locals.payload = payload;
                next();
            }
        });
    }else{
        res.sendStatus(403);
    }
}

// Helper Functions

async function createUser(UserData){
    let newUser;
    await bcrypt.hash(UserData.Password, 10).then(hash => {
        newUser = new User({
            email: UserData.Email,
            password: hash,
            firstname: UserData.Firstname,
            lastname: UserData.Lastname,
            ...(UserData.Address && {address: UserData.Address}),
        });
    })
    .catch(err => {throw err});
    return newUser;
}

function signTokenWithUser(user, res) {
    jwt.sign({UserID: user._id}, secretKey, (err, token) => {
        if(err) throw err;
        return res.json({token});
    })
}

module.exports = router;