
var defaultsBasePaths = require('./defaults/base_paths');
var defaultsBuildPaths = require('./defaults/build_paths');
var defaultsCmdAlias = require('./defaults/cmd_alias');
var defaultsEnvAlias = require('./defaults/env_alias');
var defaultsCmdValues = require('./defaults/cmd_values');
var defaultsNetworkOptions = require('./defaults/network_options');
var defaultsBase = require('./defaults/base');

var handleBase = require('./handle/base');
var handleDirectoriesToSync = require('./handle/directories_to_sync');
var handleDirectoriesToBuild = require('./handle/directories_to_build');
var handleBuildOptions = require('./handle/build_options');
var handleHtml = require('./handle/html');
var handleModuleGroup = require('./handle/module_group');
var handleModule = require('./handle/module');
var handleFilesMap = require('./handle/files_map');
var handleCustomConfig = require('./handle/custom_config');
var handleConcat = require('./handle/concat');
var handleInCssConfig = require('./handle/in_css_config');
var handleRequireJsConfig = require('./handle/require_js_config');
var handleInCssModules = require('./handle/in_css_modules');
var handleDoc = require('./handle/doc');
var handleWebpack = require('./handle/webpack');

var handleEnsurePath = require('./handle/ensure_path');

var handle = (config) => {
    defaultsBasePaths(config);
    defaultsBuildPaths(config);
    defaultsCmdAlias(config);
    defaultsEnvAlias(config);
    defaultsCmdValues(config);
    defaultsNetworkOptions(config);
    config = defaultsBase(config);
    handleBuildOptions(config);
    handleCustomConfig(config);
    handleBase(config);
    handleHtml(config);
    handleDirectoriesToSync(config);
    handleDirectoriesToBuild(config);
    handleModuleGroup(config);
    handleModule(config);
    handleConcat(config);
    handleInCssConfig(config);
    handleRequireJsConfig(config);
    handleInCssModules(config);
    handleFilesMap(config);
    handleDoc(config);
    handleWebpack(config);

    // this must be the last step, because after this, requireJsConfigPath and inCssConfigPath will be changed.
    handleEnsurePath(config);

    return config;
};

module.exports = handle;