const express = require('express');
const multer = require('multer');
const fs = require('fs');
const upload = multer({ dest: 'uploads/' });
const router = express.Router();

const Product = require('./Product');

router.get('/products', (req, res) => {
    Product.find({}, {_id: 0, __v: 0}, (err, products) => {
        if(err) throw err;
        res.json(products);
    })
});

router.post('/products/create', upload.single('picture'), (req, res) => {
    
    let imageBit = fs.readFileSync(req.file.path,{ encoding: 'base64' });
    imageBit = `data:${req.file.mimetype};base64,` + imageBit;
    const newProduct = new Product({
        type: req.body.type,
        picture: imageBit,
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
    });
    newProduct.save().then(product => {
        res.json(product);
    })
});

module.exports = router;