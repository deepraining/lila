/**
 * Created by senntyou on 2017/11/30.
 */
var projectConfig = require('./demo/lilacs.config');
projectConfig.doc = {
    include: [
        'common',
        'test'
    ]
};

require('../../util/change_cwd_to')(__dirname + '/demo');

require('../../util/exec')('lilacs doc');
