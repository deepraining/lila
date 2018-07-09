const startsWith = require('lodash/startsWith');
const through = require('through2');
const PluginError = require('plugin-error');

const isUrl = require('../../../util/is_url');

/**
 * Add cdn to static resources in html.
 *
 * @param {array|map} options Options.
 *
 * ```
 * {
 *   extensions: [], // File extensions to add.
 *   rules: [ // Rules to add.
 *     {
 *       start: string, // If starts with `start`, continue.
 *       test: RegExp, // If file path matched, continue. Here can't use 'g' mark.
 *       reverse: false[true], // Set to true, means if not matched, continue, if matched, exit.
 *       cdn: '' // Cdn to add
 *     }
 *   ]
 * }
 * ```
 *
 * @returns {*}
 */
module.exports = options => {
  const extensionsString = options.extensions.join('|');
  /**
   * To match files path existed in current html file.
   *
   * @example
   *
   * ```
   * /images/example.png
   * ```
   *
   * exclude
   *
   * 1. chart.js/chart
   * 2. chart.jsp
   *
   * @type {RegExp}
   */
  const matchFiles = new RegExp(`["'\(]\s*([^"'\)]*\.(${extensionsString})[^"'\)\w/]*\s*)["'\)]`, 'gim');

  /**
   * Matched, continue. Only handle which starts with `/` and ends with `extensions`.
   *
   * @type {RegExp}
   */
  const continueMatch = new RegExp(`^/.*\.(${extensionsString})$`, 'i');

  return through.obj(function(file, enc, cb) {
    if (file.isNull()) {
      this.push(file);
      return cb();
    }

    if (file.isStream()) {
      this.emit('error', new PluginError('lila[add-cdn]', 'Streams are not supported!'));
      return cb();
    }

    let contents = file.contents.toString().replace(matchFiles, (content, filePath) => {
      // If is url, keep it.
      if (isUrl(filePath)) {return content;}

      // Not Match, exit.
      if (!continueMatch.test(filePath)) {return content;}

      for (let i = 0; i < options.rules.length; i++) {
        let rule = options.rules[i];
        // Has start.
        if (rule.start) {
          if (
            (startsWith(filePath, rule.start) && !rule.reverse) ||
            (!startsWith(filePath, rule.start) && rule.reverse)
          )
          {return content.replace(filePath, rule.cdn + filePath);}
        }
        // Has test.
        else if (rule.test) {
          if ((rule.test.test(filePath) && !rule.reverse) || (!rule.test.test(filePath) && rule.reverse))
          {return content.replace(filePath, rule.cdn + filePath);}
        }
        // Both not provided, means match all.
        else {
          return content.replace(filePath, rule.cdn + filePath);
        }
      }

      // The rest.
      return content;
    });

    file.contents = new Buffer(contents);

    this.push(file);
    return cb();
  });
};
