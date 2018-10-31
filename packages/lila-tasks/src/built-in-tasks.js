import fs from 'fs';
import path from 'path';
import fse from 'fs-extra';
import SSH from 'gulp-ssh';
import del from 'del';
import { tmp } from './app';
import changedFiles from '../util/changed';

const { existsSync, writeFileSync } = fs;
const { join } = path;
const { moveSync, readFileSync, outputFileSync, copySync } = fse;

/**
 * correct html path
 *
 * @example
 *
 * ```
 * index.html => test/index.html
 *
 * ['@lila/correct-html', {source, target}]
 * ```
 *
 * @param page
 * @param args
 * @param lila
 * @returns {function(*)}
 */
export const correctHtml = ({ page, args, lila }) => cb => {
  const { getSetting } = lila;
  const buildDir = getSetting('build');
  const { source = 'index.html', target = `${page}.html` } =
    (args && args[0]) || {};

  moveSync(
    join(buildDir, source),
    join(buildDir, typeof target === 'function' ? target(page) : target)
  );

  return cb();
};

/**
 * replace html content
 *
 * @example
 *
 * ```
 * ['@lila/replace-html', {file, replace: [{target, replacement}]}]
 * ```
 *
 * @param page
 * @param args
 * @param lila
 * @returns {function(*)}
 */
export const replaceHtml = ({ page, args, lila }) => cb => {
  const { getSetting } = lila;
  const buildDir = getSetting('build');

  const { file = `${page}.html`, replace = [] } = (args && args[0]) || {};

  if (!Array.isArray(replace)) return cb();

  const filePath = join(
    buildDir,
    typeof file === 'function' ? file(page) : file
  );
  let content = readFileSync(filePath, 'utf8');

  replace.forEach(item => {
    const { target, replacement } = item;

    content = content.replace(target, replacement);
  });

  outputFileSync(filePath, content);

  return cb();
};

/**
 * insert html content
 *
 * @example
 *
 * ```
 * ['@lila/insert-html', {file, start, end}]
 * ```
 *
 * @param page
 * @param args
 * @param lila
 * @returns {function(*)}
 */
export const insertHtml = ({ page, args, lila }) => cb => {
  const { getSetting } = lila;
  const buildDir = getSetting('build');

  const { file = `${page}.html`, start, end } = (args && args[0]) || {};

  if (!start && !end) return cb();

  const filePath = join(
    buildDir,
    typeof file === 'function' ? file(page) : file
  );
  let content = readFileSync(filePath, 'utf8');

  if (start) content = start + content;
  if (end) content += end;

  outputFileSync(filePath, content);

  return cb();
};

/**
 * convert html extension
 *
 * @example
 *
 * ```
 * ['@lila/convert-html', {file, ext}]
 * ```
 *
 * @param page
 * @param args
 * @param lila
 * @returns {function(*)}
 */
export const convertHtml = ({ page, args, lila }) => cb => {
  const { getSetting } = lila;
  const buildDir = getSetting('build');

  const { file = `${page}.html`, ext = '' } = (args && args[0]) || {};

  if (!ext) return cb();

  const filePath = join(
    buildDir,
    typeof file === 'function' ? file(page) : file
  );

  moveSync(filePath, filePath.slice(-4) + ext);

  return cb();
};

/**
 * backup html
 *
 * @example
 *
 * ```
 * ['@lila/backup-html', {suffix, ext}]
 * ```
 *
 * @param page
 * @param args
 * @param lila
 * @returns {function(*)}
 */
export const backupHtml = ({ page, args, lila }) => cb => {
  const { getSetting } = lila;
  const buildDir = getSetting('build');

  const { suffix = new Date().getTime(), ext = 'html' } =
    (args && args[0]) || {};

  copySync(
    join(buildDir, `${page}.${ext}`),
    join(buildDir, `${page}.${suffix}.${ext}`)
  );

  return cb();
};

/**
 * rename html path
 *
 * @example
 *
 * ```
 * ['@lila/rename-html', {page, ext}]
 * ```
 *
 * @param page
 * @param args
 * @param lila
 * @returns {function(*)}
 */
export const renameHtml = ({ page, args, lila }) => cb => {
  const { getSetting } = lila;
  const buildDir = getSetting('build');

  const { page: newPage = '', ext = 'html' } = (args && args[0]) || {};

  if (!newPage) return cb();

  moveSync(
    join(buildDir, `${page}.${ext}`),
    join(
      buildDir,
      `${typeof newPage === 'function' ? newPage(page) : newPage}.${ext}`
    )
  );

  return cb();
};

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
  const [buildDir, cwd] = getSettings(['build', 'cwd']);

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
 * @returns {function(*)}
 */
export const saveCache = ({ page, args, argv, cmd }) => cb => {
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

/**
 * delete dev directory
 *
 * @example
 *
 * ```
 * '@lila/del-dev'
 * ```
 *
 * @param lila
 * @returns {function()}
 */
export const delDev = ({ lila }) => () => {
  const { getSettings } = lila;
  const [devDir, cwd] = getSettings(['dev', 'cwd']);
  const devPath = join(cwd, devDir);

  return del([devPath]);
};

/**
 * delete build directory
 *
 * @example
 *
 * ```
 * '@lila/del-build'
 * ```
 *
 * @param lila
 * @returns {function()}
 */
export const delBuild = ({ lila }) => () => {
  const { getSettings } = lila;
  const [buildDir, cwd] = getSettings(['build', 'cwd']);
  const buildPath = join(cwd, buildDir);

  return del([buildPath]);
};
