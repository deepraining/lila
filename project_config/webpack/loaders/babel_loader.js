const es2015Preset = require('babel-preset-es2015');
const stage0Preset = require('babel-preset-stage-0');
const transformReactJsx = require('babel-plugin-transform-react-jsx');
const importPlugin = require('babel-plugin-import');

/**
 * Make `babel-loader`.
 *
 * @param config
 * @returns {{loader: string, options: {presets: *[], plugins: *[]}, test: RegExp}}
 */
module.exports = config => {
  const presets = config.babelLoaderPresets || [];
  presets.unshift(stage0Preset);
  presets.unshift(es2015Preset);

  const plugins = config.babelLoaderPlugins || [];
  plugins.unshift([importPlugin.default, config.import || []]);
  plugins.unshift(transformReactJsx);

  const loader = {
    loader: 'babel-loader',
    test: /\.(js|jsx)$/,
    options: {
      presets,
      plugins,
    },
  };

  config.babelLoaderExclude && (loader.exclude = config.babelLoaderExclude);

  return loader;
};
