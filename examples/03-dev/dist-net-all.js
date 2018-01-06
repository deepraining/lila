
require('../../util/change_cwd_to')(__dirname + '/demo');

var projectConfig = require('./demo/lila.config');
projectConfig.htmlAbsoluteAndCdnPath = !0;
projectConfig.networkOptions = [];
projectConfig.networkOptions[100] = {
    staticDomain: 'http://www.baidu.com/lila',
    cssAbsolutePathPrefix: '/lila',
    backupHtml: !0
};

require('../../util/exec')('lila dist * -e 100');
