
var _ = require('lodash');
var fs = require('fs');
var inCssUtil = require('../../util/in_css');

var inCssConfig;

module.exports = (config) => {
    if (!config.useInCss) return;

    // have read once
    if (inCssConfig) {
        config.inCssConfig = _.cloneDeep(inCssConfig);
        return;
    }

    var inCssConfigPath = config.basePaths.webRoot + config.inCssConfigPath;

    if (!fs.existsSync(inCssConfigPath)) {
        logger.error('in-css config file is not exist.');
        logger.error(`Wrong Path is ${inCssConfigPath}`);
        process.exit(0);
    }

    // get in-css config
    inCssConfig = inCssUtil.getConfigFromFilePath(inCssConfigPath);

    config.inCssConfig = _.cloneDeep(inCssConfig);
};