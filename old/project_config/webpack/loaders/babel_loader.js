
const es2015Preset = require("babel-preset-es2015");
const stage0Preset = require("babel-preset-stage-0");
const transformReactJsx = require("babel-plugin-transform-react-jsx");
const importPlugin = require("babel-plugin-import");

module.exports = (config) => {

    let plugins = [transformReactJsx];
    config.import && plugins.push([importPlugin.default, config.import]);

    const loader = {
        loader: 'babel-loader',
        options: {
            presets: [es2015Preset, stage0Preset],
            plugins: plugins
        },
        test: /\.(js|jsx)$/
    };

    if (config.ignoreNodeModules) {
        loader.exclude = /node_modules/
    }

    return loader;
};
