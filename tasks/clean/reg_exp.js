/**
 * Some regular expressions for clean command.
 *
 * @type {{
 *     extractFromHtml: function(*),
 *     matchFileName: function(*),
 *     matchJsFileName: function(*),
 *     extractFromJs: function(*),
 *     matchJsChunkFileName: function(*)
 * }}
 */
module.exports = {
  /**
   * Match `js/css` files in html.
   *
   * @example
   *
   * ```
   * prefix/32-hash.js
   * prefix/32-hash.css
   * ```
   *
   * @param hashLength
   * @returns {RegExp}
   */
  extractFromHtml: hashLength => {
    return new RegExp(`/([0-9a-f]{${hashLength}})\\.`, 'g');
  },
  /**
   * Match `js/css` file name.
   *
   * @example
   *
   * ```
   * 32-hash.js
   * 32-hash.css
   * ```
   *
   * @param hashLength
   * @returns {RegExp}
   */
  matchFileName: hashLength => {
    return new RegExp(`^([0-9a-f]{${hashLength}})\\.`, 'g');
  },
  /**
   * Match `js` file name.
   *
   * @example
   *
   * ```
   * prefix/32-hash.js
   *
   * ```
   *
   * @param hashLength
   * @returns {RegExp}
   */
  matchJsFileName: hashLength => {
    return new RegExp(`/[0-9a-f]{${hashLength}}\\.js$`, 'i');
  },
  /**
   * Match js chunk file name.
   *
   * @example
   *
   * ```
   * {"0":"7b7c4210539c2c41354207f419ec0249","1":"721ea8e8a5ae693fd7ed70b501c7d28c","2":"e2025f09faac9dd460cbac6913cfbda6"}
   * ```
   *
   * @param hashLength
   * @returns {RegExp}
   */
  extractFromJs: hashLength => {
    return new RegExp(`["']([0-9a-f]{${hashLength}})["']`, 'g');
  },
  /**
   * Match chunk js file name.
   *
   * @example
   *
   * ```
   * prefix/123.32-hash.js
   * ```
   *
   * @param hashLength
   * @returns {RegExp}
   */
  matchJsChunkFileName: hashLength => {
    return new RegExp(`/[0-9]{1,}\\.[0-9a-f]{${hashLength}}\\.js$`, 'i');
  },
};
