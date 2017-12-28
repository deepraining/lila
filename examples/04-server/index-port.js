/**
 * Created by senntyou on 2017/11/30.
 */

var projectConfig = require('./demo/lilacs.config');
projectConfig.serverPort = 8091;

require('../../util/change_cwd_to')(__dirname + '/demo');

require('../../util/exec')('lilacs server');
