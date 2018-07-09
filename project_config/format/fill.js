const cloneDeep = require('lodash/cloneDeep');
const forEach = require('lodash/forEach');

// Default config root attributes.
const defaultValue = {
  // How to exclude files when use [babel-loader](https://github.com/babel/babel-loader).
  babelLoaderExclude: [/node_modules/],
  // Whether to use [css modules](https://github.com/css-modules/css-modules).
  cssModules: !1,
  // How to exclude files when transform `css-modules`.
  cssModulesExclude: [/node_modules/],
  // Whether pack css into a single css file separately.
  packCssSeparately: !1,
  // Indicates which files to load.
  fileLoaderSuffixes: ['jpg', 'jpeg', 'png', 'gif', 'ico', 'svg', 'eot', 'ttf', 'woff', 'woff2'],
  // Dev server port.
  devServerPort: 8090,
  // Treat all methods as `get` method, thus all methods can access to static file.
  treatAllMethodsAsGet: !1,
  // Whether mini js files.
  minJs: !1,
  // Whether mini css files.
  minCss: !1,
  // Whether mini html files.
  minHtml: !1,
  // Whether record file changes, thus next building only handle changed file.
  recordFileChanges: !0,
  // Whether to use mock data in developing.
  mock: !0,
};

/**
 * Fill default value to config.
 *
 * @param config
 */
module.exports = config => {
  forEach(defaultValue, (value, key) => {
    if (typeof config[key] === 'undefined') {
      config[key] = typeof value === 'object' ? cloneDeep(value) : value;
    }
  });

  // htmlCdnExtensions
  config.htmlCdnExtensions = cloneDeep(config.fileLoaderSuffixes);
  config.htmlCdnExtensions.push('js', 'css');
};
