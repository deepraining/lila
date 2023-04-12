import fs from 'fs';
import path from 'path';
import SSH from 'gulp-ssh';
import glob from 'glob';
import md5 from 'crypto-md5';
import fse from 'fs-extra';
import { Client as SSHClient } from 'ssh2';
import { isFile } from '../../../util/index';

const { join, relative } = path;
const { existsSync, readFileSync } = fs;
const { outputFileSync } = fse;

let cacheJson;

/**
 * sync files to remote server
 *
 * @example
 *
 * ```
 * ['@lila/sync', {src, server, remotePath, cache, cacheFileName}]
 * ```
 *
 * @param args
 * @param gulp
 * @param lila
 * @returns {function()}
 */
export const sync = ({ args, gulp, lila }) => cb => {
  const { getSettings } = lila;
  const [root, tmpDir] = getSettings(['root', 'tmp']);
  const { src, server, remotePath, cache = !1, cacheFileName = 'cache' } =
    (args && args[0]) || {};

  if (!src) throw new Error('src not configured');
  if (!server) throw new Error('server info not configured');
  if (!remotePath) throw new Error('remotePath not configured');

  const connect = new SSH(server);

  let globs = src;
  let options = {};

  if (Array.isArray(src) && typeof src[1] === 'object') {
    [globs, options] = src;
  }

  if (!cache) return gulp.src(globs, options).pipe(connect.dest(remotePath));

  const cacheFile = `${root}/${tmpDir}/${cacheFileName}.json`;
  const json = existsSync(cacheFile) ? require(cacheFile) : {}; // eslint-disable-line
  const files = glob.sync(globs, options);
  const changedFiles = [];

  files.forEach(file => {
    if (!isFile(file)) return;

    const key = relative(root, file);
    const content = readFileSync(file);
    const hash = md5(content, 'hex');

    if (json[key] !== hash) {
      json[key] = hash;
      changedFiles.push(file);
    }
  });

  if (!changedFiles.length) return cb();

  cacheJson = json;

  return gulp.src(changedFiles, options).pipe(connect.dest(remotePath));
};

/**
 * save files handling record after `@lila/sync` task
 *
 * @example
 *
 * ```
 * ['@lila/sync-save-cache', {cacheFileName}]
 * ```
 *
 * @param args
 * @param lila
 * @returns {function(*)}
 */
export const syncSaveCache = ({ args, lila }) => cb => {
  if (!cacheJson) return cb();

  const { cacheFileName = 'cache' } = (args && args[0]) || {};

  const { getSettings } = lila;
  const [root, tmpDir] = getSettings(['root', 'tmp']);

  const cacheFile = `${root}/${tmpDir}/${cacheFileName}.json`;

  outputFileSync(cacheFile, JSON.stringify(cacheJson));

  return cb();
};

/**
 * sync directories to remote server(relative to `root`)
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
 * sync build directory to remote server(relative to `root`)
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

  return connect
    .shell(scripts, { filePath: log })
    .pipe(gulp.dest(`${root}/${tmpDir}`));
};

/**
 * execute scripts on remote server
 *
 * @example
 *
 * ```
 * ['@lila/remote-exec', {server, scripts, log}]
 * ```
 *
 * @param args
 * @param gulp
 * @param lila
 * @returns {function()}
 */
export const remoteExec = ({ args, gulp, lila }) => () => {
  const { getSettings } = lila;
  const [root, tmpDir] = getSettings(['root', 'tmp']);

  const { server, scripts, log = 'remote-exec.log' } = (args && args[0]) || {};

  if (!server) throw new Error('server info not configured');
  if (!scripts) throw new Error('scripts not configured');

  const connect = new SSH(server);

  return connect
    .exec(scripts, { filePath: log })
    .pipe(gulp.dest(`${root}/${tmpDir}`));
};

/**
 * execute script through ssh2
 *
 * @example
 *
 * ```
 * ['@lila/ssh-exec', {server, script}]
 * ```
 *
 * @param args
 * @param lila
 * @returns {function()}
 */
export const sshExec = ({ args, lila }) => cb => {
  const { log, error } = lila;
  const { server, script } = (args && args[0]) || {};

  if (!server) throw new Error('server info not configured');
  if (!script) throw new Error('script not configured');

  const conn = new SSHClient();
  conn
    .on('ready', () => {
      conn.exec(script, (err, stream) => {
        if (err) throw err;
        stream
          .on('close', code => {
            conn.end();
            if (code < 1) cb();
            else process.exit(1);
          })
          .on('data', data => {
            log(typeof data === 'string' ? data : data.toString());
          })
          .stderr.on('data', data => {
            error(typeof data === 'string' ? data : data.toString());
          });
      });
    })
    .connect(server);
};
