/**
 * Created by senntyou on 2017/11/30.
 */

require('../../util/change_cwd_to')(__dirname + '/demo');

var projectConfig = require('./demo/lilacs.config');
projectConfig.skipNotExistingFiles = !0;
projectConfig.requireJsToTagLoad = !0;

require('../../util/exec')('lilacs dist require_js/* -e 100');
