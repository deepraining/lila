
var _ = require('lodash');
var fs = require('fs');
var requireJsUtil = require('../../util/require_js');

var requireJsConfig;

module.exports = (config) => {
    if (!config.useRequireJs) return;

    // have read once
    if (requireJsConfig) {
        config.requireJsConfig = _.cloneDeep(requireJsConfig);
        return;
    }

    var requireJsConfigPath = config.basePaths.webRoot + config.requireJsConfigPath;

    if (!fs.existsSync(requireJsConfigPath)) {
        logger.error('require-js config file is not exist.');
        logger.error(`Wrong Path is ${requireJsConfigPath}`);
        process.exit(0);
    }

    // get require-js config
    requireJsConfig = requireJsUtil.getConfigFromFilePath(requireJsConfigPath);

    config.requireJsConfig = _.cloneDeep(requireJsConfig);
};