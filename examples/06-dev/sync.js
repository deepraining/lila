
require('../../util/change_cwd')(__dirname + '/demo');

const servers = require('./servers');

const projectConfig = require('./demo/lila.config');
projectConfig.servers = servers;

require('../../util/exec')('lila sync test/index');
