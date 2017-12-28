/**
 * Created by senntyou on 2017/12/9.
 */

var serverConfig = require('./demo/lilacs.server.config');

module.exports = [
    {
        host: serverConfig.host,
        user: serverConfig.user,
        pass: serverConfig.pass,
        remotePath: '/home/senntyou/lilacs-test/static'
    },
    {
        host: serverConfig.host,
        user: serverConfig.user,
        pass: serverConfig.pass,
        remotePath: '/home/senntyou/lilacs-test/static-2',
        serverType: 'static'
    },
    {
        host: serverConfig.host,
        user: serverConfig.user,
        pass: serverConfig.pass,
        remotePath: '/home/senntyou/lilacs-test/web',
        serverType: 'web'
    },
    {
        host: serverConfig.host,
        user: serverConfig.user,
        pass: serverConfig.pass,
        remotePath: '/home/senntyou/lilacs-test/web-2',
        serverType: 'web'
    }
];

