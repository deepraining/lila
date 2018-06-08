
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
    let loader = {
        loader: 'babel-loader',
        test: /\.(js|jsx)$/,
        options: {
            presets: [
                es2015Preset,
                stage0Preset
            ],
            plugins: [
                transformReactJsx,
                [
                    importPlugin.default,
                    config.import || []
                ]
            ]
        }
    };

    config.babelLoaderExclude && (loader.exclude = config.babelLoaderExclude);

    return loader;
};
