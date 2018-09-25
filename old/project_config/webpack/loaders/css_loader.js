/**
 * make css loader
 *
 * @param useCssModules
 * @param excludeMatches
 * @param include
 * @param exclude
 * @param localIdentName
 * @returns {{test: RegExp, use: *[]}}
 */
module.exports = (useCssModules = !1, excludeMatches = [], include = !1, exclude = !1, localIdentName) => {
  const loader = {
    test: /\.css$/,
    use: [
      {
        loader: 'style-loader',
      },
      {
        loader: 'css-loader',
        options: {
          modules: useCssModules,
          localIdentName,
        },
      },
    ],
  };
  include && (loader.include = excludeMatches);
  exclude && (loader.exclude = excludeMatches);

  return loader;
};
