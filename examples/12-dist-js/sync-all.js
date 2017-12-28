/**
 * Created by senntyou on 2017/11/30.
 */

require('../../util/change_cwd_to')(__dirname + '/demo');

var servers = require('./servers');

var projectConfig = require('./demo/lilacs.config');
projectConfig.networkOptions = [];
projectConfig.networkOptions[100] = {
    useSsh: !0,
    staticDomain: 'http://www.baidu.com/lilacs',
    cssAbsolutePathPrefix: '/lilacs',
    backupHtml: !0,
    servers: servers
};

require('../../util/exec')('lilacs sync-js **/* -e 100');
