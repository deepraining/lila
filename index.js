const fs = require('fs');

const argv = require('./data/argv');
const cliInfo = require('./data/cli_info');
const pathInfo = require('./data/path_info');
const help = require('./util/help');

// command name
const commandName = argv._[0];

// Record current command name.
cliInfo.command = commandName;

// File path corresponding to command.
const commandPath = `${pathInfo.lilaRoot}/cmd/${commandName}.js`;

// has command
if (commandName && fs.existsSync(commandPath)) {
  require(commandPath);
}
// no command or not exist
else {
  help();
  process.exit(1);
}
