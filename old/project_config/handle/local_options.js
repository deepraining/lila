
const _ = require('lodash');

module.exports = config => {

    let localOption = config.local && config.localOptions && config.localOptions[config.local];
    /**
     * build option of current local can override config root attribute
     */
    if (localOption) {
        _.forEach(localOption, (value, key) => {
            config[key] = value;
        });
    }
};
