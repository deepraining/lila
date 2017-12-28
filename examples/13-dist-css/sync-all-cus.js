/**
 * Created by senntyou on 2017/11/30.
 */


/**
 * note:
 *
 * modify fie 'demo/project/dev/js/common/in_css_config.js' with:
 *
 * baseUrl: '/project/dev/css'
 *
 *  modify fie 'demo/project/dev/js/common/require_js_config.js' with:
 *
 * baseUrl: '/project/dev/js'
 */


require('../../util/change_cwd_to')(__dirname + '/demo');

require('./cus');

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

require('../../util/exec')('lilacs sync-css **/* -e 100');
