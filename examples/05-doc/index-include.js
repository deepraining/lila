
var projectConfig = require('./demo/lila.config');
projectConfig.doc = {
    include: [
        'common',
        'test'
    ]
};

require('../../util/change_cwd_to')(__dirname + '/demo');

require('../../util/exec')('lila doc');
