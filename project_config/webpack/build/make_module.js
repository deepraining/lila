const checkRules = require('../common/check_rules');

const makeBabelLoader = require('../loaders/babel_loader');
const makeCssLoader = require('../loaders/css_loader');
const makeLessLoader = require('../loaders/less_loader');
const makeUrlLoader = require('../loaders/url_loader');
const makeHtmlLoader = require('../loaders/html_loader');
const makeExtractCssLoader = require('../loaders/extract_css_loader');
const makeExtractLessLoader = require('../loaders/extract_less_loader');

/**
 * Make `webpack.module` for build.
 *
 * @param config
 */
module.exports = config => {
  checkRules(config);

  !config.disableBabelLoader && config.webpack.module.rules.push(makeBabelLoader(config));
  !config.disableUrlLoader && config.webpack.module.rules.push(makeUrlLoader(config, !0));
  !config.disableHtmlLoader && config.webpack.module.rules.push(makeHtmlLoader(config));

  const excludeMatches = config.cssModulesExclude;
  const localIdentName = config.cssModulesName;
  if (config.packCssSeparately) {
    if (config.cssModules && excludeMatches) {
      !config.disableExtractCssLoader &&
        config.webpack.module.rules.push(
          makeExtractCssLoader(!1, excludeMatches, !0, !1, localIdentName),
          makeExtractCssLoader(!0, excludeMatches, !1, !0, localIdentName)
        );
      !config.disableExtractLessLoader &&
        config.webpack.module.rules.push(
          makeExtractLessLoader(!1, excludeMatches, !0, !1, localIdentName),
          makeExtractLessLoader(!0, excludeMatches, !1, !0, localIdentName)
        );
    } else if (config.cssModules) {
      !config.disableExtractCssLoader &&
        config.webpack.module.rules.push(makeExtractCssLoader(!0, excludeMatches, !1, !1, localIdentName));
      !config.disableExtractLessLoader &&
        config.webpack.module.rules.push(makeExtractLessLoader(!0, excludeMatches, !1, !1, localIdentName));
    } else {
      !config.disableExtractCssLoader &&
        config.webpack.module.rules.push(makeExtractCssLoader(!1, [], !1, !1, localIdentName));
      !config.disableExtractLessLoader &&
        config.webpack.module.rules.push(makeExtractLessLoader(!1, [], !1, !1, localIdentName));
    }
  } else if (config.cssModules && excludeMatches) {
    !config.disableCssLoader &&
      config.webpack.module.rules.push(
        makeCssLoader(!1, excludeMatches, !0, !1, localIdentName),
        makeCssLoader(!0, excludeMatches, !1, !0, localIdentName)
      );
    !config.disableLessLoader &&
      config.webpack.module.rules.push(
        makeLessLoader(!1, excludeMatches, !0, !1, localIdentName),
        makeLessLoader(!0, excludeMatches, !1, !0, localIdentName)
      );
  } else if (config.cssModules) {
    !config.disableCssLoader &&
      config.webpack.module.rules.push(makeCssLoader(!0, excludeMatches, !1, !1, localIdentName));
    !config.disableLessLoader &&
      config.webpack.module.rules.push(makeLessLoader(!0, excludeMatches, !1, !1, localIdentName));
  } else {
    !config.disableCssLoader && config.webpack.module.rules.push(makeCssLoader(!1, [], !1, !1, localIdentName));
    !config.disableLessLoader && config.webpack.module.rules.push(makeLessLoader(!1, [], !1, !1, localIdentName));
  }
};
