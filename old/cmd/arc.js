
var fs = require('fs');
var gulpCli = require('gulp-cli');

var vars = require('../data/vars');

if (!fs.existsSync(vars.projectRoot + '/dist')) {
    logger.error('Missing `dist` directory for command: arc.');
    process.exit(0);
}

gulpCli();
