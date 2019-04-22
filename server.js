const express = require('express');
const path = require('path');

const app = express();

const PORT = process.env.PORT || 8080;

if(process.env.NODE_ENV === 'production'){
    app.use(express.static(path.join(__dirname, 'client/build')));

    app.get('*', (req, res) => {
        res.sendfile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

app.listen(PORT, () => console.log(`Server running on port ${PORT}...`));