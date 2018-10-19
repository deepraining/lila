import path from 'path';
import fs from 'fs';
import trimEnd from 'lodash/trimEnd';

const { join } = path;
const { existsSync } = fs;

/**
 * Treat all request methods as `GET` method.
 * @param req
 * @param res
 * @param next
 */
export const forceGet = (req, res, next) => {
  req.method = 'GET';
  next();
};

/**
 * api mock
 *
 * @param root
 * @returns {function(*=, *=, *)}
 */
export const makeMock = root => (req, res, next) => {
  // path/to/index/?key1=value1
  const url = trimEnd(req.url.split('?')[0], '/');

  // Don't have `.`
  if (
    url
      .split('/')
      .slice(-1)[0]
      .indexOf('.') < 0
  ) {
    const filePath = join(root, `${url}.js`);
    if (existsSync(filePath)) {
      // Disable cache.
      if (require.cache[filePath]) delete require.cache[filePath];
      require(filePath)(req, res); // eslint-disable-line
      return;
    }
  }

  next();
};
