
const _ = require('lodash');

/**
 * handle staticServerUrl
 *
 * @param config
 */
module.exports = config => {
    // ''
    if (!config.staticServerUrl) {
        config.staticServerDomain = '';
        config.staticServerDir = '';
    }
    else {
        // http://
        let hasHttp = _.startsWith(config.staticServerUrl, 'http://');
        // https://
        let hasHttps = _.startsWith(config.staticServerUrl, 'https://');
        // //
        let hasDoubleSlashes = _.startsWith(config.staticServerUrl, '//');
        let prefixLength = 0;

        if (hasHttp || hasHttps || hasDoubleSlashes) {
            hasHttp && (prefixLength = 7);
            hasHttps && (prefixLength = 8);
            hasDoubleSlashes && (prefixLength = 2);
            let threeSlashIndex = config.staticServerUrl.indexOf('/', prefixLength);
            if (threeSlashIndex < 0) {
                config.staticServerDomain = config.staticServerUrl;
                config.staticServerDir = '';
            }
            else {
                config.staticServerDomain = config.staticServerUrl.slice(0, threeSlashIndex);
                config.staticServerDir = config.staticServerUrl.slice(threeSlashIndex);
            }
        }
        else {
            config.staticServerDomain = '';
            config.staticServerDir = config.staticServerUrl;
        }
    }
};