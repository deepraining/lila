const startsWith = require('lodash/startsWith');

/**
 * Handle `staticServerUrl`.
 *
 * @param config
 */
module.exports = config => {
  // empty or ''
  if (!config.staticServerUrl) {
    config.staticServerDomain = '';
    config.staticServerDir = '';

    return;
  }

  // http://
  const hasHttp = startsWith(config.staticServerUrl, 'http://');
  // https://
  const hasHttps = startsWith(config.staticServerUrl, 'https://');
  // //
  const hasDoubleSlashes = startsWith(config.staticServerUrl, '//');

  // No domain, just directory.
  if (!hasHttp && !hasHttps && !hasDoubleSlashes) {
    config.staticServerDomain = '';
    config.staticServerDir = config.staticServerUrl;

    return;
  }

  let prefixLength = 0;

  if (hasHttp) {
    prefixLength = 7;
  } else if (hasHttps) {
    prefixLength = 8;
  } else if (hasDoubleSlashes) {
    prefixLength = 2;
  }

  // Three slash index(match directory).
  const threeSlashIndex = config.staticServerUrl.indexOf('/', prefixLength);

  // Only domain, no directory.
  if (threeSlashIndex < 0) {
    config.staticServerDomain = config.staticServerUrl;
    config.staticServerDir = '';
  }
  // Have both.
  else {
    config.staticServerDomain = config.staticServerUrl.slice(0, threeSlashIndex);
    config.staticServerDir = config.staticServerUrl.slice(threeSlashIndex);
  }
};
