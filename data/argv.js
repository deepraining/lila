const argv = require('minimist')(process.argv.slice(2));

// need `--module`
const commandsNeedModuleArg = ['dev', 'dist', 'sync', 'analyze', 'ana', 'eslint', 'stylelint', 'prettier'];

// command name
const commandName = argv._[0];

// module name
const moduleName = argv._[1];

/**
 * Convert moduleName to module argument.
 *
 * `lila dev test/index` -> `lila dev --module test/index`
 */
if (commandName && moduleName && commandsNeedModuleArg.indexOf(commandName) > -1) {
  argv.module = moduleName;
}

module.exports = argv;
