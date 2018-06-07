
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const emptyOrArray = require('../../util/empty_or_array');
const pathInfo = require('../../data/path_info');

const getJsEntryPath = require('./util/get_js_entry_path');
const commonPlugins = require('./util/common_plugins');
const makeResolve = require('./util/make_resolve');

const makeBabelLoader = require('./loaders/babel_loader');
const makeCssLoader = require('./loaders/css_loader');
const makeLessLoader = require('./loaders/less_loader');
const makeUrlLoader = require('./loaders/url_loader');
const makeHtmlLoader = require('./loaders/html_loader');

/**
 * Make `analyze config` of webpack.
 *
 * @param config
 * @returns {{
 *   entry: *[],
 *   output: {path: string, filename: string, publicPath: string},
 *   plugins: *[],
 *   module: {rules: *[]}, resolve: resolve}
 * }
 */
module.exports = config => {
    /**
     * Webpack entry config.
     */
    // Entry must be an array.
    emptyOrArray(config.webpack.entry, `
    'webpack.entry' defined in '${pathInfo.configFile}' must be an array.
    `);
    !config.webpack.entry && (config.webpack.entry = []);

    config.webpack.entry.push(
        getJsEntryPath(config)
    );


    /**
     * Webpack output config.
     */
    !config.webpack.output && (config.webpack.output = {});
    config.webpack.output.path = config.buildPaths.dev.dir + '/';
    config.webpack.output.filename = 'index.js';
    config.webpack.output.publicPath = config.basePaths.webPrefix + '/dev/';


    /**
     * Webpack plugins config.
     */
    if (config.plugins) {
        // Plugins must be an array.
        emptyOrArray(config.plugins, `
    'plugins' defined in '${pathInfo.configFile}' must be an array.    
        `);
        config.webpack.plugins = config.plugins;
    }
    else if (config.webpack.plugins) {
        emptyOrArray(config.webpack.plugins, `
    'webpack.plugins' defined in '${pathInfo.configFile}' must be an array.    
        `);
    }
    else {
        config.webpack.plugins = [];
    }

    config.webpack.plugins.push(
        new BundleAnalyzerPlugin({
            analyzerPort: config.analyzerPort
        })
    );

    commonPlugins(config);


    /**
     * Webpack module config.
     */
    !config.webpack.module && (config.webpack.module = {});
    if (config.rules) {
        // Rules must be an array.
        emptyOrArray(config.rules, `
    'rules' defined in '${pathInfo.configFile}' must be an array.    
        `);
        config.webpack.module.rules = config.rules;
    }
    else if (config.webpack.module.rules) {
        emptyOrArray(config.webpack.module.rules, `
    'webpack.module.rules' defined in '${pathInfo.configFile}' must be an array.    
        `);
    }
    else {
        config.webpack.module.rules = [];
    }

    config.webpack.module.rules.push(makeBabelLoader(config));

    let excludeMatches = config.cssModulesExclude;
    let browsers = config.browsers;
    if (config.enableCssModules && excludeMatches) {
        config.webpack.module.rules.push(
            makeCssLoader(!1, excludeMatches, !0, !1, browsers),
            makeCssLoader(!0, excludeMatches, !1, !0, browsers),
            makeLessLoader(!1, excludeMatches, !0, !1, browsers),
            makeLessLoader(!0, excludeMatches, !1, !0, browsers)
        );
    }
    else if (config.enableCssModules) {
        config.webpack.module.rules.push(
            makeCssLoader(!0, excludeMatches, !1, !1, browsers),
            makeLessLoader(!0, excludeMatches, !1, !1, browsers)
        );
    }
    else {
        config.webpack.module.rules.push(
            makeCssLoader(!1, [], !1, !1, browsers),
            makeLessLoader(!1, [], !1, !1, browsers)
        );
    }

    config.webpack.module.rules.push(
        makeUrlLoader(config),
        makeHtmlLoader(config)
    );


    /**
     * Webpack resolve config.
     */
    makeResolve(config);
};
