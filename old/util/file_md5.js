
const fs = require('fs');
const md5 = require('crypto-md5');

module.exports = (filePath) => {
    return md5(fs.readFileSync(filePath), 'hex');
};
