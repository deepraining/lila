
'use strict';

// pre handle process.argv
require('./util/pre_handle_process_argv');

var fs = require('fs');

var vars = require('./data/vars');

var showHelp = require('./util/show_help');
var logger = require('./util/logger');

// register global logger
global.logger = logger;

// command name
var command = vars.argv._ && vars.argv._[0];

vars.command = command;

// file path corresponding to command
var commandPath = vars.lilaRoot + '/cmd/' + command + '.js';

// has command
if (command && fs.existsSync(commandPath)) {
    require(commandPath);
}
// no command or not exist
else {
    showHelp();
    process.exit(0);
}
