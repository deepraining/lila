import fs from 'fs';
import path from 'path';
import rd from 'rd';
import SSH from 'gulp-ssh';
import md5 from 'crypto-md5';
import fse from 'fs-extra';

const { existsSync, readFileSync, writeFileSync } = fs;
const { join, relative } = path;
const { eachFileFilterSync } = rd;
const { removeSync } = fse;

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

  let globs = src;
  let options = { base: cwd };

  if (Array.isArray(src) && typeof src[1] === 'object') {
    [globs, options] = src;
  }

  return gulp.src(globs, options).pipe(connect.dest(remotePath));
};

/**
 * sync directories to remote server(relative to cwd)
 *
 * @example
 *
 * ```
 * ['@lila/sync-dir', {server, remotePath, dirs}]
 * ```
 *
 * @param args
 * @param gulp
 * @param lila
 * @returns {function()}
 */
export const syncDir = ({ args, gulp, lila }) => () => {
  const { getSettings } = lila;
  const [cwd] = getSettings(['cwd']);

  const { server, remotePath, dirs } = (args && args[0]) || {};

  if (!server) throw new Error('server info not configured');
  if (!remotePath) throw new Error('remotePath not configured');

  const src = (Array.isArray(dirs) ? dirs : [dirs]).map(
    dir => `${cwd}/${dir}/**/*`
  );

  const connect = new SSH(server);

  return gulp.src(src, { base: cwd }).pipe(connect.dest(remotePath));
};

/**
 * sync build directory to remote server
 *
 * @example
 *
 * ```
 * ['@lila/sync-build', {server, remotePath, sourceMap}]
 * ```
 *
 * @param args
 * @param gulp
 * @param lila
 * @returns {function()}
 */
export const syncBuild = ({ args, gulp, lila }) => () => {
  const { getSettings } = lila;
  const [buildDir, cwd] = getSettings(['build', 'cwd']);

  const { server, remotePath, sourceMap = !1 } = (args && args[0]) || {};

  if (!server) throw new Error('server info not configured');
  if (!remotePath) throw new Error('remotePath not configured');

  const src = [`${cwd}/${buildDir}/**/*`];
  if (!sourceMap) src.push(`!${cwd}/${buildDir}/**/*.map`);

  const connect = new SSH(server);

  return gulp.src(src, { base: cwd }).pipe(connect.dest(remotePath));
};

/**
 * remove handled files by last handling, and remain new files, for `build` directory
 *
 * @example
 *
 * ```
 * ['@lila/clean-cache', {cacheFileName}]
 * ```
 *
 * @param entry
 * @param args
 * @param argv
 * @param cmd
 * @param lila
 * @returns {function(*)}
 */
export const cleanCache = ({ entry, args, argv, cmd, lila }) => cb => {
  const { getSettings } = lila;
  const [cwd, buildDir, tmpDir] = getSettings(['cwd', 'build', 'tmp']);
  const buildPath = join(cwd, buildDir);

  const { cacheFileName = 'cache' } = (args && args[0]) || {};
  const cacheFile = `${cwd}/${tmpDir}/${
    typeof cacheFileName === 'function'
      ? cacheFileName({ entry, argv, cmd })
      : cacheFileName
  }.json`;
  const json = existsSync(cacheFile) ? require(cacheFile) : {}; // eslint-disable-line

  eachFileFilterSync(buildPath, file => {
    const key = relative(buildPath, file);
    const content = readFileSync(file);
    const hash = md5(content, 'hex');

    if (json[key] === hash) removeSync(file);
  });

  return cb();
};

/**
 * save files handling record, for `build` directory
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
  const [cwd, buildDir, tmpDir] = getSettings(['cwd', 'build', 'tmp']);
  const buildPath = join(cwd, buildDir);

  const { cacheFileName = 'cache' } = (args && args[0]) || {};
  const cacheFile = `${cwd}/${tmpDir}/${
    typeof cacheFileName === 'function'
      ? cacheFileName({ entry, argv, cmd })
      : cacheFileName
  }.json`;
  const json = existsSync(cacheFile) ? require(cacheFile) : {}; // eslint-disable-line

  eachFileFilterSync(buildPath, file => {
    const key = relative(buildPath, file);
    const content = readFileSync(file);

    json[key] = md5(content, 'hex');
  });

  writeFileSync(cacheFile, JSON.stringify(json));

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
  const [cwd, tmpDir] = getSettings(['cwd', 'tmp']);

  const { server, scripts, log = 'remote-shell.log' } = (args && args[0]) || {};

  if (!server) throw new Error('server info not configured');
  if (!scripts) throw new Error('scripts not configured');

  const filePath = typeof log === 'function' ? log({ entry, argv, cmd }) : log;

  const connect = new SSH(server);

  return connect
    .shell(scripts, { filePath })
    .pipe(gulp.dest(`${cwd}/${tmpDir}`));
};
