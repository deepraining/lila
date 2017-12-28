
module.exports = (info) => {

    return `
var nodeStatic = require('node-static');

var fileServer = new nodeStatic.Server('${info.path}');

require('http').createServer((req, res) => {
    req.addListener('end', () => {
        fileServer.serve(req, res);
    }).resume();
}).listen(${info.port});
    `

};