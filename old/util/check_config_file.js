
'use strict';

var fs = require('fs');
var vars = require('../data/vars');

module.exports = () => {
    if (!fs.existsSync(vars.projectRoot + '/' + vars.configFile)) {
        logger.error('Missing config file ' + vars.configFile + ' in project root, and it\'s required by lila.');
        process.exit(0);
    }
};