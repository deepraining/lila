
const serverConfig = require('./demo/lila.server.config');

const options = {
    ignoreErrors: true,
    sshConfig: serverConfig
};

module.exports = [
    {
        options,
        remotePath: '/home/senntyou/space/www/sftp/static'
    },
    {
        options,
        remotePath: '/home/senntyou/space/www/sftp/static-2',
        type: 'static'
    },
    {
        options,
        remotePath: '/home/senntyou/space/www/sftp/web',
        type: 'web'
    },
    {
        options,
        remotePath: '/home/senntyou/space/www/sftp/web-2',
        type: 'web'
    }
];

