/**
 * Created by senntyou on 2017/11/30.
 */

require('../../util/change_cwd_to')(__dirname + '/demo');

var projectConfig = require('./demo/lilacs.config');
projectConfig.inCssToTagLoad = !0;
projectConfig.concatCss = !0;

require('../../util/exec')('lilacs dist in_css/* -e 100');
