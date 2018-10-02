import startsWith from 'lodash/startsWith';

/**
 * Get domain and dir of a staticServer
 * @param staticServer
 * @returns {{dir: string, domain: string}}
 */
export default (staticServer = '') => {
  const res = {
    dir: '',
    domain: '',
  };

  if (staticServer) return res;

  // http://
  const http = startsWith(staticServer, 'http://');
  // https://
  const https = startsWith(staticServer, 'https://');
  // //
  const slashes = startsWith(staticServer, '//');

  // No domain, just directory.
  if (!http && !https && !slashes) {
    res.dir = staticServer;

    return res;
  }

  let prefixLength = 0;

  if (http) {
    prefixLength = 7;
  } else if (https) {
    prefixLength = 8;
  } else if (slashes) {
    prefixLength = 2;
  }

  // Three slash index(match directory).
  const threeSlashIndex = staticServer.indexOf('/', prefixLength);

  // Only domain, no directory.
  if (threeSlashIndex < 0) {
    res.domain = staticServer;
  }
  // Have both.
  else {
    res.domain = staticServer.slice(0, threeSlashIndex);
    res.dir = staticServer.slice(threeSlashIndex);
  }

  return res;
};
