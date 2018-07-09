/**
 * Disable built loaders.
 *
 * @param config
 */
module.exports = config => {
  if (!config.builtinRules) {
    return;
  }

  // Disable builtin `babel-loader`.
  config.disableBabelLoader = config.builtinRules.babelLoader === false;

  // Disable builtin `url-loader`.
  config.disableUrlLoader = config.builtinRules.urlLoader === false;

  // Disable builtin `html-loader`.
  config.disableHtmlLoader = config.builtinRules.htmlLoader === false;

  // Disable builtin `css-loader`.
  config.disableCssLoader = config.builtinRules.cssLoader === false;

  // Disable builtin `less-loader`.
  config.disableLessLoader = config.builtinRules.lessLoader === false;

  // Disable builtin `extract-css-loader`.
  config.disableExtractCssLoader = config.builtinRules.extractCssLoader === false;

  // Disable builtin `extract-less-loader`.
  config.disableExtractLessLoader = config.builtinRules.extractLessLoader === false;
};
