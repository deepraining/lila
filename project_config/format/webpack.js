const cliInfo = require('../../data/cli_info');

const staticServerUrl = require('../webpack/static_server_url');
const resolveModules = require('../webpack/resolve_modules');
const outResolveAlias = require('../webpack/out_resolve_alias');
const makeDevConfig = require('../webpack/make_dev_config');
const makeBuildConfig = require('../webpack/make_build_config');
const makeAnalyzeConfig = require('../webpack/make_analyze_config');

/**
 * Make `dev config`, `build config`, `analyze config` of webpack.
 *
 * @param config
 */
module.exports = config => {
  // If multiple modules, no more handling.
  if (config.multiple) {
    return;
  }

  staticServerUrl(config);
  resolveModules(config);
  outResolveAlias(config);

  !config.webpack && (config.webpack = {});

  if (cliInfo.command === 'dev') {
    makeDevConfig(config);
  } else if (cliInfo.command === 'dist' || cliInfo.command === 'sync') {
    makeBuildConfig(config);
  } else if (cliInfo.command === 'analyze' || cliInfo.command === 'ana') {
    makeAnalyzeConfig(config);
  }
};
