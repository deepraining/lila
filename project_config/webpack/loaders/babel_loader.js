
const cloneDeep = require('lodash/cloneDeep');

const es2015Preset = require("babel-preset-es2015");
const stage0Preset = require("babel-preset-stage-0");
const transformReactJsx = require("babel-plugin-transform-react-jsx");
const importPlugin = require("babel-plugin-import");


/**
 * Make `babel-loader`.
 *
 * @param config
 * @returns {{loader: string, options: {presets: *[], plugins: *[]}, test: RegExp}}
 */
module.exports = config => {
    const loader = config.babelLoader ? cloneDeep(config.babelLoader) : {};

    loader.loader = 'babel-loader';
    loader.test = /\.(js|jsx)$/;

    !loader.options && (loader.options = {});
    !loader.options.presets && (loader.options.presets = []);
    !loader.options.plugins && (loader.options.plugins = []);

    loader.options.presets.push(
        es2015Preset,
        stage0Preset
    );

    loader.options.plugins.push(transformReactJsx);
    config.import && loader.options.plugins.push([importPlugin.default, config.import]);

    return loader;
};
