const express = require('express');
const multer = require('multer');
const fs = require('fs');
const upload = multer({ dest: 'uploads/' });
const router = express.Router();

const helper = require('./helper');
const Product = require('./Product');

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

router.use((req, res) => {
    if(req.file){
        fs.unlink(req.file.path, err => {
            if(err) throw err;
        });
    }
});

module.exports = router;