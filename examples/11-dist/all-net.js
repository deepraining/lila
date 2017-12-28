/**
 * Created by senntyou on 2017/11/30.
 */

require('../../util/change_cwd_to')(__dirname + '/demo');

var projectConfig = require('./demo/lilacs.config');
projectConfig.networkOptions = [];
projectConfig.networkOptions[100] = {
    staticDomain: 'http://www.baidu.com/lilacs',
    cssAbsolutePathPrefix: '/lilacs',
    backupHtml: !0
};

require('../../util/exec')('lilacs dist * -e 100');
