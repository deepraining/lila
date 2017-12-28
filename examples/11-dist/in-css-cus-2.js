/**
 * Created by senntyou on 2017/11/30.
 */

/**
 * note:
 *
 * modify fie 'demo/project/dev/js/common/in_css_config.js' with:
 *
 * baseUrl: '/project/dev/css'
 */

require('../../util/change_cwd_to')(__dirname + '/demo');

require('./cus');
require('./cus-in-css-config');

var projectConfig = require('./demo/lilacs.config');
projectConfig.inCssToTagLoad = !0;

require('../../util/exec')('lilacs dist in_css/* -e 100');
