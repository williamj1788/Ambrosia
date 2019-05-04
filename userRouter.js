const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const User = require('./User');
const secretKey = require('./config').secretKey;
const clientID = require('./config').clientID;

router.get('/test', (req,res) => {
    res.cookie('test', 'value');
    res.send(req.cookies);
});


router.get('/', verifyToken, (req, res) => {
    const UserID = res.locals.payload.UserID;
    const projection = {_id: 0, password: 0, __v: 0, googleID: 0};
    User.findById(UserID, projection, (err, user) => {
        if(err) throw err;
        if(user){
            return res.json(user);
        }
        res.status(404).json({
            message: 'User Not Found'
        });
    });
});

router.post('/create', ValidateEmail, async (req, res) => {
    const newUser = await createUser(req.body);
    newUser.save().then(user => {
        signTokenWithUser(user, res);
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

router.post('/google', async (req, res) => {
    const BearerHeader = req.headers['authorization'];
    const token = BearerHeader.split(' ')[1];
    const { OAuth2Client } = require('google-auth-library');
    const client = new OAuth2Client(clientID);
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: clientID
    });
    const payload = ticket.getPayload();
    User.findOne({googleID: payload.sub}, (err, user) => {
        if(err) throw err;
        if(user){
            signTokenWithUser(user, res);
        }else{
            const newUser = new User({
                email: payload.email,
                firstname: payload.given_name,
                ...(payload.family_name && {lastname: payload.family_name}),
                googleID: payload.sub,
                picture: payload.picture
            });
            newUser.save().then(user => {
                signTokenWithUser(user, res);
            });
        }
    });
});

router.get('/signout', (req,res) => {
    res.clearCookie('token',{httpOnly: true});
    res.send();
});

router.get('/email', ValidateEmail,(req, res) => {
    res.send();
});

// Middleware Functions

function ValidateEmail(req, res, next){
    let query = {};
    if(req.body){
        query.email = req.body.Email;
    }else{
        query.email = req.query.email
    }

    User.findOne(query, (err, user) => {
        if(err) throw err;
        if(!user){
            next();
        }else{
            res.status(400).json({
                message: 'There is already an account with this email'
            });
        }
    })
}

function verifyToken(req, res, next) {
    const token = req.cookies.token;
    if(token){
        jwt.verify(token, secretKey, (err, payload) => {
            if(err){
                res.sendStatus(403);
            }else{
                res.locals.payload = payload;
                next();
            }
        });
    }else{
        res.status(403).json({
            message: 'forbidden'
        });
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
        res.cookie('token', token, {maxAge: 9000000000, httpOnly: true});
        return res.json(extractBasicProfileData(user));
    })
}

function extractBasicProfileData(user){
    return {
        email: user.email,
        firstname: user.firstname,
        admin: user.admin,
        ...(user.lastname && {lastname: user.lastname}),
        ...(user.address && {address: user.address}),
        ...(user.picture && {picture: user.picture}),
    }
}

module.exports = router;