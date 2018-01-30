
require('../../util/change_cwd_to')(__dirname + '/demo');

var projectConfig = require('./demo/lila.config');
projectConfig.htmlAbsoluteAndCdnPath = !0;
projectConfig.network = [];
projectConfig.network[100] = {
    staticDomain: 'http://www.baidu.com/lila',
    cssAbsolutePathPrefix: '/lila',
    backupHtml: !0
};

projectConfig.buildOptions = [];
projectConfig.buildOptions[100] = {
    renameHtmlMap: {
        'test/index': 'parent/inner/index',
        'test-2/index': 'parent/inner/index-2',
        'test-3/index': 'parent/inner/index-3',
        'test-5/index': 'parent/inner/index-5'
    }
};

require('../../util/exec')('lila dist * -e 100');
