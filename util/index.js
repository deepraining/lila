import fs from 'fs';
import path from 'path';

const { statSync, existsSync } = fs;
const { join } = path;

/**
 * Test is url or not.
 * @param url
 * @returns {boolean}
 */
export const isUrl = url =>
  url.slice(0, 7) === 'http://' ||
  url.slice(0, 8) === 'https://' ||
  url.slice(0, 2) === '//';

/**
 * Test is file or not.
 * @param file
 * @returns {*}
 */
export const isFile = file => {
  try {
    const stat = statSync(file);

    return stat.isFile();
  } catch (err) {
    if (err.code === 'ENOENT') return !1;

    throw new Error(err);
  }
};

/**
 * Test is directory or not.
 * @param dir
 * @returns {*}
 */
export const isDir = dir => {
  try {
    const stat = statSync(dir);

    return stat.isDirectory();
  } catch (err) {
    if (err.code === 'ENOENT') return !1;

    throw new Error(err);
  }
};

/**
 * Replace back slash with slash.
 *
 * @example
 *
 * ```
 * \\ -> /
 * \\\\ -> /
 * ```
 *
 * @param str
 * @returns {string}
 */
export const correctSlash = str => str.replace(/(\\\\|\\)/g, '/');

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

const tryMock = ({ root, url, req, res }) => {
  // url: `/one/two/three`
  const urls = url.split('/');
  const lastName = urls[urls.length - 1];

  // first try `/one/two/three.js`
  const filePath = join(root, `${url}.js`);
  if (existsSync(filePath)) {
    // disable cache
    if (require.cache[filePath]) delete require.cache[filePath];

    const fn = require(filePath); // eslint-disable-line
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
    if (require.cache[parentFilePath]) delete require.cache[parentFilePath];

    const exp = require(parentFilePath); // eslint-disable-line
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
 * @param mockRoot
 * @param isLib
 * @returns {function(*=, *=, *)}
 */
export const makeMock = ({ lila, entry, mockRoot, isLib = !1 }) => (
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
  if (lastName.indexOf('.') < 0) {
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
            })
          )
            return;
        }
      }
    }

    // ${root}/url.js
    if (tryMock({ root, url, req, res })) return;
    // ${root}/mock/url.js
    if (tryMock({ root, url: correctSlash(join('mock', url)), req, res }))
      return;

    if (isLib) {
      // ${root}/${entry}/url.js
      if (tryMock({ root, url: correctSlash(join(entry, url)), req, res }))
        return;
      // ${root}/${entry}/mock/url.js
      if (
        tryMock({ root, url: correctSlash(join(entry, 'mock', url)), req, res })
      )
        return;
    } else {
      // ${root}/${srcDir}/url.js
      if (tryMock({ root, url: correctSlash(join(srcDir, url)), req, res }))
        return;
      // ${root}/${srcDir}/mock/url.js
      if (
        tryMock({
          root,
          url: correctSlash(join(srcDir, 'mock', url)),
          req,
          res,
        })
      )
        return;
      // ${root}/${srcDir}/${entry}/url.js
      if (
        tryMock({ root, url: correctSlash(join(srcDir, entry, url)), req, res })
      )
        return;
      // ${root}/${srcDir}/${entry}/mock/url.js
      if (
        tryMock({
          root,
          url: correctSlash(join(srcDir, entry, 'mock', url)),
          req,
          res,
        })
      )
        return;
    }
  }

  next();
};
