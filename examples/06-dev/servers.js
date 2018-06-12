
const serverConfig = require('./demo/lila.server.config');

module.exports = [
    {
        options: {
            host: serverConfig.host,
            user: serverConfig.user,
            pass: serverConfig.pass,
            remotePath: '/home/senntyou/space/www/sftp/static'
        }
    },
    {
        options: {
            host: serverConfig.host,
            user: serverConfig.user,
            pass: serverConfig.pass,
            remotePath: '/home/senntyou/space/www/sftp/static-2',
        },
        type: 'static'
    },
    {
        options: {
            host: serverConfig.host,
            user: serverConfig.user,
            pass: serverConfig.pass,
            remotePath: '/home/senntyou/space/www/sftp/web',
        },
        type: 'web'
    },
    {
        options: {
            host: serverConfig.host,
            user: serverConfig.user,
            pass: serverConfig.pass,
            remotePath: '/home/senntyou/space/www/sftp/web-2',
        },
        type: 'web'
    }
];

