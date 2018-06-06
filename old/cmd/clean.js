
const fs = require('fs');
const gulpCli = require('gulp-cli');
const _ = require('lodash');

const vars = require('../data/vars');

if (!fs.existsSync(vars.projectRoot + '/dist')) {
    logger.error('Missing `dist` directory for command: clean.');
    process.exit(0);
}

gulpCli();
