
module.exports = (info) => {
    return `
var path = require('path');
var express = require('express');
var rd = require('rd');

var app = express();

app.use((req, res, next) => {
    res.set('Access-Control-Allow-Origin', req.headers.origin || '*');
    res.set('Access-Control-Allow-Credentials', 'true');
    res.set('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

rd.eachFileFilterSync('${info.dataPath}', (file) => {
    if (file.slice(-3) != '.js') return;
    var index = path.relative('${info.webRootPath}', file);
    var url = index.replace(/\\\\/g, '/').slice(0, -3);
    app.all('/' + url, require(file));
});

app.listen(${info.port});
    `
};