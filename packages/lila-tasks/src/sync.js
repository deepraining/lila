import fs from 'fs';
import path from 'path';
import SSH from 'gulp-ssh';

import changedFiles from '../util/changed';

const { existsSync, writeFileSync } = fs;
const { join } = path;

const newCacheJson = {};
/**
 * sync all static resources to remote server
 *
 * @example
 *
 * ```
 * ['@lila/sync-all', {server, remotePath, extra, cache, cacheFileName}]
 * ```
 *
 * @param page
 * @param args
 * @param argv
 * @param cmd
 * @param gulp
 * @param lila
 * @returns {function()}
 */
export const syncAll = ({ page, args, argv, cmd, gulp, lila }) => () => {
  const { getSettings } = lila;
  const [buildDir, cwd, tmp] = getSettings(['build', 'cwd', 'tmp']);

  const {
    server,
    remotePath,
    extra = [],
    cache,
    cacheFileName = 'cache',
    sourceMap = !1,
  } = (args && args[0]) || {};

  if (!server) throw new Error('server info not configured');
  if (!remotePath) throw new Error('remotePath not configured');

  let src = [buildDir, ...extra].map(dir => `${cwd}/${dir}/**/*`);
  if (!sourceMap) src.splice(1, 0, `!${cwd}/${buildDir}/**/*.map`);

  if (cache) {
    const cacheFile = `${tmp}/${
      typeof cacheFileName === 'function'
        ? cacheFileName({ page, argv, cmd })
        : cacheFileName
    }.json`;
    const oldJson = existsSync(cacheFile) ? require(cacheFile) : {}; // eslint-disable-line
    const { json, changed } = changedFiles(
      [buildDir, ...extra],
      cwd,
      oldJson,
      sourceMap ? [] : ['map']
    );

    src = changed;
    newCacheJson[page] = json;
  }

  const connect = new SSH(server);

  return gulp.src(src, { base: cwd }).pipe(connect.dest(remotePath));
};

/**
 * save cache after sync-all task
 *
 * @example
 *
 * ```
 * ['@lila/save-cache', {cacheFileName}]
 * ```
 *
 * @param page
 * @param args
 * @param argv
 * @param cmd
 * @param lila
 * @returns {function(*)}
 */
export const saveCache = ({ page, args, argv, cmd, lila }) => cb => {
  const { getSettings } = lila;
  const [tmp] = getSettings(['tmp']);

  const { cacheFileName = 'cache' } = (args && args[0]) || {};
  const cacheFile = `${tmp}/${
    typeof cacheFileName === 'function'
      ? cacheFileName({ page, argv, cmd })
      : cacheFileName
  }.json`;
  const json = newCacheJson[page];

  if (json) writeFileSync(cacheFile, JSON.stringify(json));

  return cb();
};

/**
 * sync html files to remote server
 *
 * @example
 *
 * ```
 * ['@lila/sync-html', {server, remotePath, ext}]
 * ```
 *
 * @param args
 * @param gulp
 * @param lila
 * @returns {function()}
 */
export const syncHtml = ({ args, gulp, lila }) => () => {
  const { getSettings } = lila;
  const [buildDir, cwd] = getSettings(['build', 'cwd']);
  const buildPath = join(cwd, buildDir);

  const { server, remotePath, ext = 'html' } = (args && args[0]) || {};

  if (!server) throw new Error('server info not configured');
  if (!remotePath) throw new Error('remotePath not configured');

  const connect = new SSH(server);

  return gulp
    .src(`${buildPath}/**/*.${ext}`, { base: buildPath })
    .pipe(connect.dest(remotePath));
};

/**
 * sync sourcemap files to remote server
 *
 * @example
 *
 * ```
 * ['@lila/sync-sourcemap', {server, remotePath}]
 * ```
 *
 * @param args
 * @param gulp
 * @param lila
 * @returns {function()}
 */
export const syncSourceMap = ({ args, gulp, lila }) => () => {
  const { getSettings } = lila;
  const [buildDir, cwd] = getSettings(['build', 'cwd']);
  const buildPath = join(cwd, buildDir);

  const { server, remotePath } = (args && args[0]) || {};

  if (!server) throw new Error('server info not configured');
  if (!remotePath) throw new Error('remotePath not configured');

  const connect = new SSH(server);

  return gulp
    .src(`${buildPath}/**/*.map`, { base: buildPath })
    .pipe(connect.dest(remotePath));
};