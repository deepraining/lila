
// default network option item
var defaults = {
    // whether use sftp to upload files, default is ftp
    useSsh: false
};

var _ = require('lodash');

module.exports = (option) => {
    option = _.defaults(option, _.cloneDeep(defaults));

    if (!option.servers) return option;

    var servers = option.servers;
    // all servers
    option.servers = [];
    // all web servers
    option.webServers = [];
    // all static servers
    option.staticServers = [];

    servers.forEach((server) => {
        // no ssh field
        typeof server.useSsh == 'undefined' && (server.useSsh = option.useSsh);
        // ensure port attribute
        !server.port && (server.port = server.useSsh ? 22 : 21);
        // no serverType field, default is static
        typeof server.serverType == 'undefined' && (server.serverType = 'static');

        option.servers.push(server);
        server.serverType == 'web' && option.webServers.push(server);
        server.serverType == 'static' && option.staticServers.push(server);
    });

    return option;
};