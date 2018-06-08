
const checkRules = require('../common/check_rules');

const makeBabelLoader = require('../loaders/babel_loader');
const makeCssLoader = require('../loaders/css_loader');
const makeLessLoader = require('../loaders/less_loader');
const makeUrlLoader = require('../loaders/url_loader');
const makeHtmlLoader = require('../loaders/html_loader');


/**
 * Make `webpack.module` for `dev` command.
 *
 * @param config
 */
module.exports = config => {

    checkRules(config);

    config.webpack.module.rules.push(
        makeBabelLoader(config),
        makeUrlLoader(config),
        makeHtmlLoader(config)
    );

    let excludeMatches = config.cssModulesExclude;
    let browsers = config.browsers;
    if (config.enableCssModules && excludeMatches) {
        config.webpack.module.rules.push(
            makeCssLoader(!1, excludeMatches, !0, !1, browsers),
            makeCssLoader(!0, excludeMatches, !1, !0, browsers),
            makeLessLoader(!1, excludeMatches, !0, !1, browsers),
            makeLessLoader(!0, excludeMatches, !1, !0, browsers)
        );
    }
    else if (config.enableCssModules) {
        config.webpack.module.rules.push(
            makeCssLoader(!0, excludeMatches, !1, !1, browsers),
            makeLessLoader(!0, excludeMatches, !1, !1, browsers)
        );
    }
    else {
        config.webpack.module.rules.push(
            makeCssLoader(!1, [], !1, !1, browsers),
            makeLessLoader(!1, [], !1, !1, browsers)
        );
    }
};
