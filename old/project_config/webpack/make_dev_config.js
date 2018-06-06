
const webpack = require('webpack');
const _ = require('lodash');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');

const getJsEntryPath = require('./util/get_js_entry_path');
const makeResolve = require('./util/make_resolve');
const makeHtmlPlugin = require('./util/make_html_plugin');
const makeBabelLoader = require('./loaders/babel_loader');
const makeCssLoader = require('./loaders/css_loader');
const makeLessLoader = require('./loaders/less_loader');
const makeUrlLoader = require('./loaders/url_loader');
const makeHtmlLoader = require('./loaders/html_loader');

module.exports = (config) => {

    const babelLoader = makeBabelLoader(config);
    const urlLoader = makeUrlLoader(config);
    const htmlLoader = makeHtmlLoader(config);

    const plugins = [
        new webpack.HotModuleReplacementPlugin(),
        makeHtmlPlugin(config),
        new FriendlyErrorsWebpackPlugin()
    ];

    // ProvidePlugin
    if (config.provide) plugins.push(new webpack.ProvidePlugin(config.provide));

    // DefinePlugin
    if (config.define) plugins.push(new webpack.DefinePlugin(config.define));

    let rules = [babelLoader];

    let excludeMatches = config.cssModulesExclude;
    let browsers = config.browsers;
    if (config.enableCssModules && excludeMatches) {
        rules.push(
            makeCssLoader(!1, excludeMatches, !0, !1, browsers),
            makeCssLoader(!0, excludeMatches, !1, !0, browsers),
            makeLessLoader(!1, excludeMatches, !0, !1, browsers),
            makeLessLoader(!0, excludeMatches, !1, !0, browsers)
        );
    }
    else if (config.enableCssModules) {
        rules.push(
            makeCssLoader(!0, excludeMatches, !1, !1, browsers),
            makeLessLoader(!0, excludeMatches, !1, !1, browsers)
        );
    }
    else {
        rules.push(
            makeCssLoader(!1, [], !1, !1, browsers),
            makeLessLoader(!1, [], !1, !1, browsers)
        );
    }

    rules.push(
        urlLoader,
        htmlLoader
    );

    const devConfig = {
        entry: [
            'webpack-hot-middleware/client?reload=true',
            getJsEntryPath(config)
        ],
        output: {
            path: config.buildPaths.dev.dir + '/' + config.module + '/',
            filename: 'index.js',
            publicPath: config.basePaths.webPrefix + '/dev/' + config.module + '/'
        },
        plugins: plugins,
        module: {
            rules: rules
        },
        resolve: makeResolve(config)
    };

    return devConfig;
};
