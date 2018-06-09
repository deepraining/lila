
const serverConfig = require('./demo/lila.server.config');

module.exports = [
    {
        option: {
            host: serverConfig.host,
            user: serverConfig.user,
            pass: serverConfig.pass,
            remotePath: '/home/senntyou/lila-test/static'
        }
    },
    {
        option: {
            host: serverConfig.host,
            user: serverConfig.user,
            pass: serverConfig.pass,
            remotePath: '/home/senntyou/lila-test/static-2',
        },
        type: 'static'
    },
    {
        option: {
            host: serverConfig.host,
            user: serverConfig.user,
            pass: serverConfig.pass,
            remotePath: '/home/senntyou/lila-test/web',
        },
        type: 'web'
    },
    {
        option: {
            host: serverConfig.host,
            user: serverConfig.user,
            pass: serverConfig.pass,
            remotePath: '/home/senntyou/lila-test/web-2',
        },
        serverType: 'web'
    }
];

