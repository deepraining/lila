import fs from 'fs';
import path from 'path';
import del from 'del';
import fse from 'fs-extra';

const { existsSync } = fs;
const { join } = path;
const { copySync, moveSync } = fse;

/**
 * move file or directory(relative to `root`)
 *
 * @example
 *
 * ```
 * ['@lila/move', {source, target, force}]
 * ```
 *
 * @param args
 * @param lila
 * @returns {function(*)}
 */
export const move = ({ args, lila }) => cb => {
  const { warn, getSettings } = lila;

  const { source, target, force = !1 } = (args && args[0]) || {};

  if (!source) {
    warn('task skipped: source not configured');
    return cb();
  }

  if (!target) {
    warn('task skipped: target not configured');
    return cb();
  }

  const [root] = getSettings(['root']);
  const sourcePath = join(root, source);
  const targetPath = join(root, target);

  if (!existsSync(sourcePath)) {
    warn(`task skipped: source ${source} not exist`);
    return cb();
  }

  if (existsSync(targetPath) && !force) {
    warn(`task skipped: target ${target} existed`);
    return cb();
  }

  moveSync(sourcePath, targetPath, { overwrite: !0 });

  return cb();
};

/**
 * copy file or directory(relative to `root`)
 *
 * @example
 *
 * ```
 * ['@lila/copy', {source, target, force}]
 * ```
 *
 * @param args
 * @param lila
 * @returns {function(*)}
 */
export const copy = ({ args, lila }) => cb => {
  const { warn, getSettings } = lila;

  const { source, target, force = !1 } = (args && args[0]) || {};

  if (!source) {
    warn('task skipped: source not configured');
    return cb();
  }

  if (!target) {
    warn('task skipped: target not configured');
    return cb();
  }

  const [root] = getSettings(['root']);
  const sourcePath = join(root, source);
  const targetPath = join(root, target);

  if (!existsSync(sourcePath)) {
    warn(`task skipped: source ${source} not exist`);
    return cb();
  }

  if (existsSync(targetPath) && !force) {
    warn(`task skipped: target ${target} existed`);
    return cb();
  }

  copySync(sourcePath, targetPath, { overwrite: !0 });

  return cb();
};

/**
 * delete files or directories(relative to `root`)
 *
 * @example
 *
 * ```
 * ['@lila/del', file]
 * ['@lila/del', [file1, dir2, dir3, ...]]
 * ```
 *
 * @param args
 * @param lila
 * @returns {function()}
 */
export const delTask = ({ args, lila }) => cb => {
  const { warn, getSettings } = lila;
  const [root] = getSettings(['root']);

  const dirs = args && args[0];

  if (!dirs) {
    warn('task skipped: files or directories not configured');
    return cb();
  }

  return del(
    (Array.isArray(dirs) ? dirs : [dirs]).map(dir => `${root}/${dir}`)
  );
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
  const [root, devDir] = getSettings(['root', 'dev']);

  return del([`${root}/${devDir}`]);
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
  const [root, buildDir] = getSettings(['root', 'build']);

  return del([`${root}/${buildDir}`]);
};

/**
 * delete tmp directory
 *
 * @example
 *
 * ```
 * '@lila/del-tmp'
 * ```
 *
 * @param lila
 * @returns {function()}
 */
export const delTmp = ({ lila }) => () => {
  const { getSettings } = lila;
  const [root, tmpDir] = getSettings(['root', 'tmp']);

  return del([`${root}/${tmpDir}`]);
};
