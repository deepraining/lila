import fs from 'fs';
import path from 'path';
import SSH from 'gulp-ssh';

import { changedFiles } from './util';

const { existsSync, writeFileSync } = fs;
const { join } = path;

/**
 * sync files to remote server
 *
 * @example
 *
 * ```
 * ['@lila/sync', {src, server, remotePath}]
 * ```
 *
 * @param args
 * @param gulp
 * @param lila
 * @returns {function()}
 */
export const sync = ({ args, gulp, lila }) => () => {
  const { getSettings } = lila;
  const [cwd] = getSettings(['cwd']);

  const { src, server, remotePath } = (args && args[0]) || {};

  if (!src) throw new Error('src not configured');
  if (!server) throw new Error('server info not configured');
  if (!remotePath) throw new Error('remotePath not configured');

  const connect = new SSH(server);

  return gulp.src(src, { base: cwd }).pipe(connect.dest(remotePath));
};

const newCacheJson = {};
/**
 * sync build directory to remote server
 *
 * @example
 *
 * ```
 * ['@lila/sync-build', {server, remotePath, extra, cache, cacheFileName, sourceMap}]
 * ```
 *
 * @param entry
 * @param args
 * @param argv
 * @param cmd
 * @param gulp
 * @param lila
 * @returns {function()}
 */
export const syncBuild = ({ entry, args, argv, cmd, gulp, lila }) => () => {
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
        ? cacheFileName({ entry, argv, cmd })
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
    newCacheJson[entry] = json;
  }

  const connect = new SSH(server);

  return gulp.src(src, { base: cwd }).pipe(connect.dest(remotePath));
};

/**
 * save cache after sync-build task
 *
 * @example
 *
 * ```
 * ['@lila/save-cache', {cacheFileName}]
 * ```
 *
 * @param entry
 * @param args
 * @param argv
 * @param cmd
 * @param lila
 * @returns {function(*)}
 */
export const saveCache = ({ entry, args, argv, cmd, lila }) => cb => {
  const { getSettings } = lila;
  const [tmp] = getSettings(['tmp']);

  const { cacheFileName = 'cache' } = (args && args[0]) || {};
  const cacheFile = `${tmp}/${
    typeof cacheFileName === 'function'
      ? cacheFileName({ entry, argv, cmd })
      : cacheFileName
  }.json`;
  const json = newCacheJson[entry];

  if (json) writeFileSync(cacheFile, JSON.stringify(json));

  delete newCacheJson[entry];

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

/**
 * execute shell scripts on remote server
 *
 * @example
 *
 * ```
 * ['@lila/remote-shell', {server, scripts, log}]
 * ```
 *
 * @param entry
 * @param argv
 * @param args
 * @param gulp
 * @param cmd
 * @param lila
 * @returns {function()}
 */
export const remoteShell = ({ entry, argv, args, gulp, cmd, lila }) => () => {
  const { getSettings } = lila;
  const [tmp] = getSettings(['tmp']);

  const { server, scripts, log = 'remote-shell.log' } = (args && args[0]) || {};

  if (!server) throw new Error('server info not configured');
  if (!scripts) throw new Error('scripts not configured');

  const filePath = typeof log === 'function' ? log({ entry, argv, cmd }) : log;

  const connect = new SSH(server);

  return connect.shell(scripts, { filePath }).pipe(gulp.dest(tmp));
};
