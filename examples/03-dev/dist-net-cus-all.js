
require('../../util/change_cwd_to')(__dirname + '/demo');

require('./cus');

var projectConfig = require('./demo/lila.config');
projectConfig.htmlAbsoluteAndCdnPath = !0;
projectConfig.network = [];
projectConfig.network[100] = {
    staticDomain: 'http://www.baidu.com/lila',
    cssAbsolutePathPrefix: '/lila',
    backupHtml: !0
};

require('../../util/exec')('lila dist * -e 100');
