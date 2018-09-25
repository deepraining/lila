/**
 * Make `url-loader`.
 *
 * @param config
 * @param isBuild
 * @returns {{loader: string, options: {limit: number}, test: RegExp}}
 */
module.exports = (config, isBuild) => {
  const options = {
    // 0 means infinite, put 1 here to disable base64.
    limit: 1,
  };

  if (isBuild) {
    options.publicPath = `${config.staticServerDir + config.basePaths.webPrefix}/dist/`;
  }

  return {
    loader: 'url-loader',
    options,
    test: new RegExp(`\.(${config.fileLoaderSuffixes.join('|')})$`),
  };
};
