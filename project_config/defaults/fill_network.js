
// default network option item
var defaults = {
    // whether use sftp to upload files, default is ftp
    useSsh: false,
    /**
     * static server domain
     *
     * example: http://www.example.com, http://www.example.com/sub_dir, http://www.example.com/sub_dir/sub_sub_dir
     *
     */
    staticDomain: '',
    /**
     *
     * prefix to be prepended to absolute path in css files.
     *
     * if the staticDomain is not a totally root server, but a sub directory, like http://www.example.com/sub_dir,
     * and thus, absolute reference in css will not work correctly, here is to solve this problem.
     *
     */
    cssAbsolutePathPrefix: '',
    /**
     * whether backup html or converted file from html after each building.
     */
    backupHtml: false
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