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
require('./cus-in-css-config');
require('./cus-require-js-config');

var projectConfig = require('./demo/lilacs.config');
projectConfig.networkOptions = [];
projectConfig.networkOptions[100] = {
    staticDomain: 'http://www.baidu.com/lilacs',
    cssAbsolutePathPrefix: '/lilacs',
    backupHtml: !0
};

require('../../util/exec')('lilacs dist * -e 100');
