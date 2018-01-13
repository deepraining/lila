
require('../../util/change_cwd_to')(__dirname + '/demo');

var servers = require('./servers');

var projectConfig = require('./demo/lila.config');
projectConfig.htmlAbsoluteAndCdnPath = !0;
projectConfig.network = [];
projectConfig.network[100] = {
    useSsh: !0,
    staticDomain: 'http://www.baidu.com/lila',
    cssAbsolutePathPrefix: '/lila',
    backupHtml: !0,
    servers: servers
};

require('../../util/exec')('lila sync * -e 100');
