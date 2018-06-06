
const serverConfig = require('./demo/lila.server.config');

module.exports = [
    {
        host: serverConfig.host,
        user: serverConfig.user,
        pass: serverConfig.pass,
        remotePath: '/home/senntyou/lila-test/static'
    },
    {
        host: serverConfig.host,
        user: serverConfig.user,
        pass: serverConfig.pass,
        remotePath: '/home/senntyou/lila-test/static-2',
        serverType: 'static'
    },
    {
        host: serverConfig.host,
        user: serverConfig.user,
        pass: serverConfig.pass,
        remotePath: '/home/senntyou/lila-test/web',
        serverType: 'web'
    },
    {
        host: serverConfig.host,
        user: serverConfig.user,
        pass: serverConfig.pass,
        remotePath: '/home/senntyou/lila-test/web-2',
        serverType: 'web'
    }
];

