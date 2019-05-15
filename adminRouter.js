const express = require('express');
const multer = require('multer');
const fs = require('fs');
const moment = require('moment');
const upload = multer({ dest: 'uploads/' });
const router = express.Router();

const helper = require('./helper');
const Product = require('./Product');
const Discount = require('./Discount');

console.log(moment().add(2,'minutes'));

router.use(upload.single('picture'));

router.get('/products', (req, res) => {
    Product.getAll((err, products) => {
        if(err) throw err;
        res.json(products);
    });
});

router.post('/products/create', (req, res, next) => {
    const newProduct = new Product({
        type: req.body.type,
        picture: helper.toBase64(req.file),
        name: req.body.name,
        description: req.body.description,
        price: helper.trimNumber(req.body.price),
    });
    newProduct.save()
    .then(product => res.json(product))
    .catch(error => {throw error});
    next();
});

router.post('/products/edit/:id', (req, res, next) => {
    const picture = req.file ? helper.toBase64(req.file): null;
    const update = {
        $set: {
            type: req.body.type,
            ...(picture && { picture }),
            name: req.body.name,
            description: req.body.description,
            price:  helper.trimNumber(req.body.price),
        }
    }
    Product.findByIdAndUpdate(req.params.id, update, {'new': true}, (err, product) => {
        if(err) throw err;
        if(!product){
            return res.status(404).json({message: 'product not found' });
        }
        return res.json(product);
    });
    next();
});

router.delete('/products/delete/:id', (req, res) => {
    Product.findByIdAndDelete(req.params.id, (err) => {
        if(err) throw err;
        res.send();
    });
});

router.post('/products/discount/create/:id', GetProduct, (req, res) => {
    
    if(req.product.discount){
        return res.status(400).json({message: 'Product already has a discount'});
    }
    const newDiscount = new Discount({
        price: req.body.newPrice,
        expriresAt: req.body.expireAt,
        productID: req.product._id,
    });
    newDiscount.save()
    .then(discount => {
        Product.findByIdAndUpdate(req.product._id, {$set: {'discount': discount._id}}, {"new": true}, (err, product) => {
            if(err) throw err;
            product = product.toObject();
            product.discount = discount;
            res.json(product);
        });
    })
    .catch(err => {
        res.json({message: 'There was a validation error'})
        throw err;
    });
});

router.post('/products/discount/edit/:id', GetProduct, (req, res) => {
    const update = {
        $set: {
            price: req.body.newPrice,
            expriresAt: req.body.expireAt,
        }
    };

    Discount.findByIdAndUpdate(req.product.discount, update, {'new': true}, (err, discount) => {
        if(err) throw err;
        if(!discount){
            res.status(400).json({message: 'Product does not have a discount already'});
        }
        const product = req.product.toObject();
        product.discount = discount;
        res.json(product);
    });
});

router.use((req, res) => {
    if(req.file){
        fs.unlink(req.file.path, err => {
            if(err) throw err;
        });
    }
});

function GetProduct(req, res, next){
    Product.findById(req.params.id, (err, product) => {
        if(err){
            if(err.name === 'CastError'){
                return res.status(400).json({message: 'ID is invalid'});
            }else{
                throw err;
            }
        }
        if(!product){
            return res.status(404).json({message: 'Product Not Found'});
        }
        req.product = product;
        next();
    });
}

module.exports = router;