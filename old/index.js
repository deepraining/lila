const fs = require('fs');

const argv = require('./data/argv');
const cliInfo = require('./data/cli_info');
const pathInfo = require('./data/path_info');
const help = require('./util/help');
const logger = require('./util/logger');

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
  logger.error(`
  Local lila do not support '${commandName}' command. 
  Please see detail help information below.
  `);
  help();
  process.exit(0);
}
