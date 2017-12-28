
'use strict';

// pre handle process.argv
require('./util/pre_handle_process_argv');

var fs = require('fs');

var vars = require('./data/vars');
var packageJson = require('./data/package_json');
var version = packageJson.version;

var showHelp = require('./util/show_help');
var logger = require('./util/logger');

// register global logger
global.logger = logger;

// command name
var command = vars.argv._ && vars.argv._[0];
// file path corresponding to command
var commandPath = vars.lilacsRoot + '/cmd/' + command + '.js';

// has command
if (command && fs.existsSync(commandPath)) {
    require(commandPath);
}
// no command or not exist
else {
    // -v --version
    if (vars.argv.v || vars.argv.version) {
        logger.log(version);
    }
    // -h --help
    else if (vars.argv.h || vars.argv.help) {
        showHelp();
    }
    else {
        showHelp();
    }
    process.exit(0);
}