
const defaultsBuildPaths = require('./defaults/build_paths');
const defaultsCmdAlias = require('./defaults/cmd_alias');
const defaultsEnvAlias = require('./defaults/env_alias');
const defaultsCmdValues = require('./defaults/cmd_values');
const defaultsNetwork = require('./defaults/network');
const defaultsBase = require('./defaults/base');

const handleBase = require('./handle/base');
const handleDirectoriesToSync = require('./handle/directories_to_sync');
const handleLocalOptions = require('./handle/local_options');
const handleEnvOptions = require('./handle/env_options');
const handleCommandOptions = require('./handle/command_options');
const handleHtml = require('./handle/html');
const handleModuleGroup = require('./handle/module_group');
const handleModule = require('./handle/module');
const handleCustomConfig = require('./handle/custom_config');
const handleWebpack = require('./handle/webpack');

const handle = (config) => {
    defaultsBuildPaths(config);
    defaultsCmdAlias(config);
    defaultsEnvAlias(config);
    defaultsCmdValues(config);
    defaultsNetwork(config);
    config = defaultsBase(config);
    handleLocalOptions(config);
    handleEnvOptions(config);
    handleCommandOptions(config);
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
