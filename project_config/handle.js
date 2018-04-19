
var defaultsBasePaths = require('./defaults/base_paths');
var defaultsBuildPaths = require('./defaults/build_paths');
var defaultsCmdAlias = require('./defaults/cmd_alias');
var defaultsEnvAlias = require('./defaults/env_alias');
var defaultsCmdValues = require('./defaults/cmd_values');
var defaultsNetwork = require('./defaults/network');
var defaultsBase = require('./defaults/base');

var handleBase = require('./handle/base');
var handleDirectoriesToSync = require('./handle/directories_to_sync');
var handleLocalOptions = require('./handle/local_options');
var handleEnvOptions = require('./handle/env_options');
var handleHtml = require('./handle/html');
var handleModuleGroup = require('./handle/module_group');
var handleModule = require('./handle/module');
var handleCustomConfig = require('./handle/custom_config');
var handleWebpack = require('./handle/webpack');

var handle = (config) => {
    defaultsBasePaths(config);
    defaultsBuildPaths(config);
    defaultsCmdAlias(config);
    defaultsEnvAlias(config);
    defaultsCmdValues(config);
    defaultsNetwork(config);
    config = defaultsBase(config);
    handleLocalOptions(config);
    handleEnvOptions(config);
    handleCustomConfig(config);
    handleBase(config);
    handleHtml(config);
    handleDirectoriesToSync(config);
    handleModuleGroup(config);
    handleModule(config);
    handleWebpack(config);

    return config;
};

module.exports = handle;