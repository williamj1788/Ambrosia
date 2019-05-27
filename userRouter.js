const express = require('express');
const bodyParser = require('body-parser')
const multer = require('multer');
const upload = multer();
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { OAuth2Client } = require('google-auth-library');

const User = require('./User');
const Product = require('./Product');

const secretKey = require('./config').secretKey;
const clientID = require('./config').clientID;

router.use(upload.none());

router.get('/', verifyToken, (req, res) => {
    User.findById(req.payload.UserID, {_id: 0,  __v: 0}, (err, user) => {
        if(err) throw err;
        if(user){
            return res.json(user);
        }
        res.status(404).json({message: 'User Not Found'});
    });
});

router.post('/create', ValidateEmail, (req, res, next) => {
    bcrypt.hash(req.body.Password, 10,(err, hash) => {
        if(err) throw err;
        newUser = new User({
            email: req.body.Email,
            password: hash,
            firstname: req.body.Firstname,
            lastname: req.body.Lastname,
            ...(req.body.Address && {address: req.body.Address}),
        })
        newUser.save()
        .then(user => {
            req.user = user;
            next();
        })
        .catch(err => {throw err});
    })
},signTokenWithUser);

router.post('/order/create', bodyParser.json(),  verifyToken , async (req, res) => {

    let newOrder = {
        address: req.body.address,
        productList: []
    }
    
    for(let order of req.body.orders){
        await Product.findById(order.productID, (err, product) => {
            if(err) throw err;
            newOrder.productList.push({
                type: product.type,
                name: product.name,
                price: order.price,
                qty: order.qty
            });
        });
    }

    User.findById(req.payload.UserID, (err, user) => {
        if(err) throw err;
        user.orders.push(newOrder);
        user.save((err, user) => {
            if(err) throw err;
            res.json(user);
        })
    });

});

router.post('/login',(req, res, next) => {
    User.findOne({email: req.body.Email},'+password', (err, user) => {
        if(err) throw err;
        if(user){
            return bcrypt.compare(req.body.Password, user.password, (err, isValidUser) => {
                if(err) throw err;
                if(isValidUser){
                    req.user = user;
                    return next();
                }
                res.status(404).json({ error: 'Email or Password is incorrect' });
            });
        }
        res.status(404).json({ error: 'Email or Password is incorrect' });
    });
},signTokenWithUser);

router.post('/google', verifyGoogleToken, (req, res, next) => {
    User.findOne({googleID: req.payload.sub}, (err, user) => {
        if(err) throw err;
        if(user){
            req.user = user;
            next()
        }else{
            const newUser = new User({
                email: req.payload.email,
                firstname: req.payload.given_name,
                ...(req.payload.family_name && {lastname: req.payload.family_name}),
                googleID: req.payload.sub,
                picture: req.payload.picture
            });
            newUser.save().then(user => {
                req.user = user;
                next();
            });
        }
    });
},signTokenWithUser);

router.get('/signout', (req,res) => {
    res.clearCookie('token',{httpOnly: true});
    res.send();
});

router.get('/email', ValidateEmail, (req, res) => {
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
        if(user){
            res.status(400).json({
                message: 'There is already an account with this email'
            });
        }else{
            next();
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
                req.payload = payload;
                next();
            }
        });
    }else{
        res.status(403).json({
            message: 'forbidden'
        });
    }
}

function verifyGoogleToken(req, res, next){
    const token = req.headers['authorization'].split(' ')[1];
    const client = new OAuth2Client(clientID);
    client.verifyIdToken({ idToken: token, audience: clientID }, (err, ticket) => {
        if(err) throw err;
        req.payload = ticket.getPayload();
        next();
    });
}

function signTokenWithUser(req, res) {
    jwt.sign({UserID: req.user._id}, secretKey, (err, token) => {
        if(err) throw err;
        res.cookie('token', token, {maxAge: 9000000000, httpOnly: true});
        const { password, googleID, _id , ...Profile } = req.user.toObject();
        res.json(Profile);
    })
}

module.exports = router;