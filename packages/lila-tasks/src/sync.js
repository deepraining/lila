import path from 'path';
import SSH from 'gulp-ssh';

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
  const [root] = getSettings(['root']);

  const { src, server, remotePath } = (args && args[0]) || {};

  if (!src) throw new Error('src not configured');
  if (!server) throw new Error('server info not configured');
  if (!remotePath) throw new Error('remotePath not configured');

  const connect = new SSH(server);

  let globs = src;
  let options = { base: root };

  if (Array.isArray(src) && typeof src[1] === 'object') {
    [globs, options] = src;
  }

  return gulp.src(globs, options).pipe(connect.dest(remotePath));
};

/**
 * sync directories to remote server(relative to root)
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
  const [root] = getSettings(['root']);

  const { server, remotePath, dirs } = (args && args[0]) || {};

  if (!server) throw new Error('server info not configured');
  if (!remotePath) throw new Error('remotePath not configured');
  if (!dirs) throw new Error('dirs not configured');

  const src = (Array.isArray(dirs) ? dirs : [dirs]).map(
    dir => `${root}/${dir}/**/*`
  );

  const connect = new SSH(server);

  return gulp.src(src, { base: root }).pipe(connect.dest(remotePath));
};

/**
 * sync build directory to remote server(relative to root)
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
  const [buildDir, root] = getSettings(['build', 'root']);

  const { server, remotePath, sourceMap = !0 } = (args && args[0]) || {};

  if (!server) throw new Error('server info not configured');
  if (!remotePath) throw new Error('remotePath not configured');

  const src = [`${root}/${buildDir}/**/*`];
  if (!sourceMap) src.push(`!${root}/${buildDir}/**/*.map`);

  const connect = new SSH(server);

  return gulp.src(src, { base: root }).pipe(connect.dest(remotePath));
};

/**
 * sync html files to remote server(relative to build)
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
  const [buildDir, root] = getSettings(['build', 'root']);
  const buildPath = join(root, buildDir);

  const { server, remotePath, ext = 'html' } = (args && args[0]) || {};

  if (!server) throw new Error('server info not configured');
  if (!remotePath) throw new Error('remotePath not configured');

  const connect = new SSH(server);

  return gulp
    .src(`${buildPath}/**/*.${ext}`, { base: buildPath })
    .pipe(connect.dest(remotePath));
};

/**
 * sync source-map files to remote server(relative to build)
 *
 * @example
 *
 * ```
 * ['@lila/sync-source-map', {server, remotePath}]
 * ```
 *
 * @param args
 * @param gulp
 * @param lila
 * @returns {function()}
 */
export const syncSourceMap = ({ args, gulp, lila }) => () => {
  const { getSettings } = lila;
  const [buildDir, root] = getSettings(['build', 'root']);
  const buildPath = join(root, buildDir);

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
 * @param args
 * @param gulp
 * @param lila
 * @returns {function()}
 */
export const remoteShell = ({ args, gulp, lila }) => () => {
  const { getSettings } = lila;
  const [root, tmpDir] = getSettings(['root', 'tmp']);

  const { server, scripts, log = 'remote-shell.log' } = (args && args[0]) || {};

  if (!server) throw new Error('server info not configured');
  if (!scripts) throw new Error('scripts not configured');

  const connect = new SSH(server);

  return connect.shell(scripts, { log }).pipe(gulp.dest(`${root}/${tmpDir}`));
};
