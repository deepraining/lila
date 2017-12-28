
var _ = require('lodash');

module.exports = (config) => {

    // no files map
    if (!config.currentFilesMap || !_.keys(config.currentFilesMap).length) return;

    var currentFilesMap = config.currentFilesMap;
    config.currentFilesMap = {};

    _.forEach(currentFilesMap, (value, key) => {
        var suffix = key.slice(-2),
            newKey, newValue;

        // js
        if (suffix == 'js') {
            newKey = 'js/' + key;
            newValue = 'js/' + value;
        }
        // css
        else if (suffix == 'ss') {
            newKey = 'css/' + key;
            newValue = 'css/' + value;
        }
        // html
        else if (suffix == 'ml') {
            newKey = 'html/' + key;
            newValue = 'html/' + value;
        }

        config.currentFilesMap[newKey] = newValue;
    });
};