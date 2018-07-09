const keys = require('lodash/keys');

/**
 * Html replacing, inserting, converting extension.
 *
 * @param config
 */
module.exports = config => {
  // Has replacing in html.
  config.hasHtmlReplace = config.htmlReplace && keys(config.htmlReplace).length;
  // Has inserting in html.
  config.hasHtmlInsert = config.htmlInsert && keys(config.htmlInsert).length;
  // Has converting to other extension file.
  config.hasHtmlExtension = !!config.htmlExtension;
};
