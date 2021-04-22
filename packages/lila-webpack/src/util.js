import path from 'path';
import fs from 'fs';
import fse from 'fs-extra';
import trimEnd from 'lodash/trimEnd';
import rd from 'rd';
import { tryDefault, correctSlash } from '../../../util/index';
import { defaultExt } from './defaults';

const { join, relative } = path;
const { existsSync } = fs;
const { readFileSync } = fse;
const { readDirFilterSync } = rd;

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
 * try mock file internal function
 *
 * @param root Root directory
 * @param url
 * @param req
 * @param res
 * @param cache Whether cache node modules
 * @returns {boolean}
 */
const tryMockInternal = ({ root, url, req, res, cache }) => {
  // url: `/one/two/three`
  const urls = url.split('/');
  const lastName = urls[urls.length - 1];

  // first try `/one/two/three.js`
  const filePath = join(root, `${url}.js`);
  if (existsSync(filePath)) {
    // disable cache
    if (!cache && require.cache[filePath]) delete require.cache[filePath];

    const m = require(filePath); // eslint-disable-line
    const fn = m ? m.default : undefined;
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

    const m = require(parentFilePath); // eslint-disable-line
    const fn = m ? m[lastName] : undefined;

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

const digitRegExp = /^\d$/;
const digitMark = '$d';

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
  // try url directly
  if (tryMockInternal({ root, url, req, res, cache })) return !0;

  // check if have dynamic url
  const urls = url.split('/');
  let hasDynamic = !1;
  const newUrls = urls.map(s => {
    if (digitRegExp.test(s.slice(0, 1))) {
      hasDynamic = !0;
      return digitMark;
    }
    return s;
  });

  if (hasDynamic) {
    const newUrl = newUrls.join('/');
    if (tryMockInternal({ root, url: newUrl, req, res, cache })) return !0;
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
    if (!existsSync(htmlFilePath)) {
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end(`
Can't show this page currently, you can: <br/>
1. reload this page<br/>
2. if step 1 is failed, check whether set <em style="color: blue">devMiddleware.writeToDisk</em> to <em style="color: blue">true</em> in <em style="color: blue">lila.init.js</em>
`);
      return;
    }

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

// get all entries under a dir
export const makeGetEntries = lila => (dirPath, srcPath) => {
  const { getSettings } = lila;
  const [excludeEntries, extToSearch = defaultExt] = getSettings([
    'excludeEntries',
    'extToSearch',
  ]);

  const entries = [];
  readDirFilterSync(dirPath, subDirPath => {
    const htmlFile = `${subDirPath}/index.html`;
    const jsFile = `${subDirPath}/index.${extToSearch}`;

    // Both `index.html` and `index.${extToSearch}` existing, means this directory is an entry's workspace.
    if (!existsSync(htmlFile) || !existsSync(jsFile)) return;

    const entry = correctSlash(relative(srcPath, subDirPath));

    if (!excludeEntries) {
      entries.push(entry);
      return;
    }

    const excludeType = typeof excludeEntries;

    // function
    if (excludeType === 'function') {
      if (excludeEntries(entry)) return;
    }
    // string
    else if (excludeType === 'string') {
      if (entry === excludeEntries) return;
    }
    // RegExp
    else if (excludeEntries instanceof RegExp) {
      if (excludeEntries.test(entry)) return;
    }
    // array
    else if (Array.isArray(excludeEntries)) {
      for (let i = 0, il = excludeEntries.length; i < il; i += 1) {
        const excludeEntry = excludeEntries[i];

        // string
        if (typeof excludeEntry === 'string') {
          if (entry === excludeEntry) return;
        }
        // RegExp
        else if (excludeEntry instanceof RegExp) {
          if (excludeEntry.test(entry)) return;
        }
      }
    }

    entries.push(entry);
  });
  return entries;
};

// get js file path for command serve
export const makeServePath = lila => {
  const defaultEntry = lila.getSetting('defaultEntry');

  return (entry, srcDir) =>
    `${srcDir}/${entry === defaultEntry ? '' : `${entry}/`}serve.js`;
};
