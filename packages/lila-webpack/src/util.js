import path from 'path';
import fs from 'fs';
import fse from 'fs-extra';
import trimEnd from 'lodash/trimEnd';

const { join } = path;
const { existsSync } = fs;
const { readFileSync } = fse;

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

/**
 * simulate a backend environment
 *
 * @param root
 * @param devDir
 * @param servePath
 * @returns {function(*=, *, *)}
 */
export const makeServe = ({ root, devDir, servePath }) => (req, res, next) => {
  // path/to/index/?key1=value1
  const url = trimEnd(req.url.split('?')[0], '/');

  if (url === '/serve') {
    const filePath = join(root, servePath);
    const htmlFilePath = join(root, `${devDir}/index.html`);

    if (!existsSync(filePath)) throw new Error(`file not found ${filePath}`);
    if (!existsSync(htmlFilePath))
      throw new Error(`file not found ${htmlFilePath}`);

    const content = readFileSync(htmlFilePath, 'utf8');

    // Disable cache.
    if (require.cache[filePath]) delete require.cache[filePath];

    const serve = require(filePath); // eslint-disable-line

    const newContent = serve(content, req);
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(newContent);

    return;
  }

  next();
};

/**
 * ['page1', 'page2/*'] => ['page1', 'page2/subPage1', 'page2/subPage2']
 *
 * @param pages
 * @param getPages
 * @param srcPath
 * @returns {Array}
 */
export const getAllPages = ({ pages, getPages, srcPath }) => {
  const allPages = [];

  pages.forEach(page => {
    if (page === '*' || page === 'all')
      allPages.push(...(getPages(srcPath) || []));
    else if (page.slice(-2) === '/*')
      allPages.push(...(getPages(join(srcPath, page.slice(0, -2))) || []));
    else if (page.slice(-4) === '/all')
      allPages.push(...(getPages(join(srcPath, page.slice(0, -4))) || []));
    else allPages.push(page);
  });

  return allPages;
};
