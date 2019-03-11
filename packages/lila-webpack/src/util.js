import path from 'path';
import fs from 'fs';
import fse from 'fs-extra';
import trimEnd from 'lodash/trimEnd';
import { tryDefault, correctSlash } from '../../../util/index';

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
 * try mock file
 *
 * @param root Root directory
 * @param url
 * @param req
 * @param res
 * @param cache Whether cache node modules
 * @returns {boolean}
 */
const tryMock = ({ root, url, req, res, cache }) => {
  // url: `/one/two/three`
  const urls = url.split('/');
  const lastName = urls[urls.length - 1];

  // first try `/one/two/three.js`
  const filePath = join(root, `${url}.js`);
  if (existsSync(filePath)) {
    // disable cache
    if (!cache && require.cache[filePath]) delete require.cache[filePath];

    const fn = tryDefault(require(filePath)); // eslint-disable-line
    if (typeof fn === 'function') {
      fn(req, res);
      return !0;
    }
    if (fn) {
      res.writeHead(200, { 'Content-Type': 'application/json; charset=UTF-8' });
      res.end(JSON.stringify(fn));
      return !0;
    }
  }

  // second try `/one/two.js` `{three}`
  const parentFilePath = join(root, `${urls.slice(0, -1).join('/')}.js`);
  if (existsSync(parentFilePath)) {
    // disable cache
    if (!cache && require.cache[parentFilePath])
      delete require.cache[parentFilePath];

    const exp = tryDefault(require(parentFilePath)); // eslint-disable-line
    const fn = exp[lastName];

    if (typeof fn === 'function') {
      fn(req, res);
      return !0;
    }
    if (fn) {
      res.writeHead(200, { 'Content-Type': 'application/json; charset=UTF-8' });
      res.end(JSON.stringify(fn));
      return !0;
    }
  }

  return !1;
};

/**
 * api mock
 *
 * @param lila
 * @param entry
 * @param mockRoot Extra mock root directories
 * @param isLib For library or application
 * @param cache Whether cache node modules
 * @returns {function(*=, *=, *)}
 */
export const makeMock = ({ lila, entry, mockRoot, isLib = !1, cache = !1 }) => (
  req,
  res,
  next
) => {
  const { getSettings } = lila;
  const [root, srcDir] = getSettings(['root', 'src']);

  // `/one/two/three/?key1=value1`
  let url = req.url.split('?')[0];

  if (url.slice(-1) === '/') url = url.slice(0, -1);

  // url: `/one/two/three`
  const urls = url.split('/');
  const lastName = urls[urls.length - 1];

  // if have '.', will be treated as a static file
  if (url && lastName.indexOf('.') < 0) {
    const extraRoots = [];
    if (mockRoot) {
      if (typeof mockRoot === 'string') extraRoots.push(mockRoot);
      else if (Array.isArray(mockRoot)) extraRoots.push(...mockRoot);
      else if (typeof mockRoot === 'function') {
        const result = mockRoot(entry, lila);

        if (typeof result === 'string') extraRoots.push(result);
        else if (Array.isArray(result)) extraRoots.push(...result);
      }

      if (extraRoots.length) {
        for (let i = 0, il = extraRoots.length; i < il; i += 1) {
          if (
            tryMock({
              root,
              url: correctSlash(join(extraRoots[i], url)),
              req,
              res,
              cache,
            })
          )
            return;
        }
      }
    }

    // ${root}/url.js
    if (tryMock({ root, url, req, res, cache })) return;
    // ${root}/mock/url.js
    if (
      tryMock({ root, url: correctSlash(join('mock', url)), req, res, cache })
    )
      return;

    if (isLib) {
      // for start command, entry is always relative to root.

      // ${root}/${entry}/url.js
      if (
        tryMock({ root, url: correctSlash(join(entry, url)), req, res, cache })
      )
        return;
      // ${root}/${entry}/mock/url.js
      if (
        tryMock({
          root,
          url: correctSlash(join(entry, 'mock', url)),
          req,
          res,
          cache,
        })
      )
        return;
    } else {
      // ${root}/${srcDir}/url.js
      if (
        tryMock({ root, url: correctSlash(join(srcDir, url)), req, res, cache })
      )
        return;
      // ${root}/${srcDir}/mock/url.js
      if (
        tryMock({
          root,
          url: correctSlash(join(srcDir, 'mock', url)),
          req,
          res,
          cache,
        })
      )
        return;
      // ${root}/${srcDir}/${entry}/url.js
      if (
        tryMock({
          root,
          url: correctSlash(join(srcDir, entry, url)),
          req,
          res,
          cache,
        })
      )
        return;
      // ${root}/${srcDir}/${entry}/mock/url.js
      if (
        tryMock({
          root,
          url: correctSlash(join(srcDir, entry, 'mock', url)),
          req,
          res,
          cache,
        })
      )
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

    const serve = tryDefault(require(filePath)); // eslint-disable-line

    const newContent = serve(content, req);
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(newContent);

    return;
  }

  next();
};

/**
 * ['entry1', 'entry2/*'] => ['entry1', 'entry2/subEntry1', 'entry2/subEntry2']
 *
 * @param entries
 * @param getEntries
 * @param srcPath
 * @param root
 * @returns {Array}
 */
export const getAllEntries = ({ entries, getEntries, srcPath, root }) => {
  const allEntries = [];

  entries.forEach(entry => {
    if (entry === '*' || entry === 'all')
      allEntries.push(...(getEntries(srcPath, srcPath) || []));
    else if (entry.slice(-2) === '/*')
      allEntries.push(
        ...(getEntries(join(srcPath, entry.slice(0, -2)), srcPath, root) || [])
      );
    else if (entry.slice(-4) === '/all')
      allEntries.push(
        ...(getEntries(join(srcPath, entry.slice(0, -4)), srcPath, root) || [])
      );
    else allEntries.push(entry);
  });

  return allEntries;
};
