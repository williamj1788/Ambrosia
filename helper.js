const fs = require('fs');


module.exports = {
    toBase64: file => `data:${file.mimetype};base64,` + fs.readFileSync(file.path,{ encoding: 'base64' }),
    trimNumber: (num, target = 2) => Math.floor(num * Math.pow(10, target)) / 100,
}