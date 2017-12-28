/**
 * Created by senntyou on 2017/11/30.
 */

/**
 * note:
 *
 * modify fie 'demo/project/dev/js/common/require_js_config.js' with:
 *
 * baseUrl: '/project/dev/js'
 */

require('../../util/change_cwd_to')(__dirname + '/demo');

require('./cus');
require('./cus-require-js-config');

var projectConfig = require('./demo/lilacs.config');
projectConfig.skipNotExistingFiles = !0;

require('../../util/exec')('lilacs dist require_js/* -e 100');
