
var projectConfig = require('./demo/lila.config');
projectConfig.mockExpressServerPort = 8191;

require('../../util/change_cwd_to')(__dirname + '/demo');

require('../../util/exec')('lila mock-express');
