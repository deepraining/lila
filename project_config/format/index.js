const argv = require('../../data/argv');

const basePaths = require('./base_paths');
const buildPaths = require('./build_paths');

const cmdAlias = require('./cmd_alias');
const envAlias = require('./env_alias');
const cmdValues = require('./cmd_values');

const localOptions = require('./local_options');
const moduleOptions = require('./module_options');
const envOptions = require('./env_options');
const commandOptions = require('./command_options');

const fill = require('./fill');

const processing = require('./processing');
const moduleGroup = require('./module_group');
const formatModule = require('./module');
const html = require('./html');
const directoriesToSync = require('./directories_to_sync');
const servers = require('./servers');
const builtinRules = require('./builtin_rules');
const webpack = require('./webpack');

/**
 * Format import config to a new one which lila needed.
 *
 * @param config
 * @param custom Whether is custom config.
 */
module.exports = (config, custom) => {
  // paths
  basePaths(config);
  buildPaths(config);

  // cmd
  cmdAlias(config);
  envAlias(config);
  // Here only pre load some required arguments.
  cmdValues(config, !0, custom);

  // Options to override config root attribute.
  localOptions(config);
  moduleOptions(config);
  envOptions(config);
  commandOptions(config);
  cmdValues(config);

  // `beforeFormatConfig` callback
  config.beforeFormatConfig && config.beforeFormatConfig(config, argv);

  // Fill default value to config.
  fill(config);

  // More handling.
  processing(config);
  moduleGroup(config);
  formatModule(config);
  html(config);
  directoriesToSync(config);
  servers(config);
  builtinRules(config);
  webpack(config);

  return config;
};
