
"use strict";

var packageJson = require('../data/package_json');
var version = packageJson.version;
var cliOptions = require('../data/cli_options');
var commands = require('../data/commands');

module.exports = () => {
    // ensure process.argv has 'help' argument
    process.argv.indexOf('-h') < 0 && process.argv.indexOf('--help') < 0 && process.argv.push('-h');

    // must in here, for ensuring -h/--help used by yargs
    var yargs = require('yargs');

    var yargsInstance = yargs.usage('\nUsage: lila <command> [args]');

    commands.forEach((cmd) => {
        yargsInstance.command(cmd.name, cmd.desc);
    });

    var argv = yargsInstance.help('help')
        .alias('help', 'h')
        .version('version', version)
        .alias('version', 'v')
        .options(cliOptions)
        .argv;

    // print
    console.dir(argv);
};