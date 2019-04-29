const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const multer = require('multer');
const upload = multer();
const cookieParser = require('cookie-parser');

const userRouter = require('./userRouter');
const app = express();

const url = require('./config').url;
mongoose.connect(url, {useNewUrlParser: true})
    .then(() => console.log('connected to database'))
    .catch(err => console.log(err));

app.use(upload.none());
app.use(cookieParser());
app.use(allowCrossDomain);

app.use('/api/user', userRouter);

if(process.env.NODE_ENV === 'production'){
    app.use(express.static(path.join(__dirname, 'client/build')));

    app.get('*', (req, res) => {
        res.sendfile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}...`));

function allowCrossDomain(req,res,next){
    res.setHeader('Access-Control-Allow-Origin','http://localhost:3000');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
}