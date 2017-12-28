/**
 * Created by senntyou on 2017/11/30.
 */
var projectConfig = require('./demo/lilacs.config');
projectConfig.mockExpressPort = 8191;

require('../../util/change_cwd_to')(__dirname + '/demo');

require('../../util/exec')('lilacs mock-express');
