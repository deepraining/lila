
const glob = require('glob');
const gulpCli = require('gulp-cli');

const vars = require('../data/vars');
const revertData = require('../data/revert');

revertData.archivePackages = glob.sync('dist-*.zip');

if (!revertData.archivePackages || !revertData.archivePackages.length) {
    logger.error('No archive packages in current directory.');
    process.exit(0);
}

const index = parseInt(vars.argv.i) || parseInt(vars.argv.index) || 0;
if (index > revertData.archivePackages.length) {
    logger.error(`Index ${index} is greater than packages' length ${revertData.archivePackages.length}.`);
    process.exit(0);
}

revertData.index = index || 1;

gulpCli();
