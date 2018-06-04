
module.exports = (config) => {

    // specify a module group, not a existed module
    if (config.moduleGroup && config.moduleGroup[config.module])
        config.module = config.moduleGroup[config.module].join(',');

};