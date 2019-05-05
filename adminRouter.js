const express = require('express');
const multer = require('multer');
const fs = require('fs');
const upload = multer({ dest: 'uploads/' });
const router = express.Router();

const Product = require('./Product');

router.get('/products', (req, res) => {
    Product.find({}, {__v: 0}, (err, products) => {
        if(err) throw err;
        res.json(products);
    })
});

router.post('/products/create', upload.single('picture'), (req, res) => {
    
    let imageBit = fs.readFileSync(req.file.path,{ encoding: 'base64' });
    imageBit = `data:${req.file.mimetype};base64,` + imageBit;
    fs.unlink(req.file.path, err => {
        console.log(err);
    });
    const newProduct = new Product({
        type: req.body.type,
        picture: imageBit,
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
    });
    newProduct.save().then(product => {
        res.json(product);
    });
});

router.post('/products/edit/:id', upload.single('picture'),(req, res) => {
    let imageBit = null;
    if(req.file){
        imageBit = fs.readFileSync(req.file.path,{ encoding: 'base64' });
        imageBit = `data:${req.file.mimetype};base64,` + imageBit;
        fs.unlink(req.file.path, err => {
            console.log(err);
        });
    }
    const update = {
        $set: {
            type: req.body.type,
            ...(imageBit && {picture: imageBit}),
            name: req.body.name,
            description: req.body.description,
            price: req.body.price

        }
    }

    const option ={
        'new': true,
    }
    
    Product.findByIdAndUpdate(req.params.id, update, option, (err, product) => {
        if(err) throw err;
        if(!product){
            return res.status(404).json({message: 'product not found' });
        }
        console.log(product);
        return res.json(product);
    });
});

module.exports = router;