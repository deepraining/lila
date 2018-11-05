import del from 'del';
import fse from 'fs-extra';

const { copySync, moveSync } = fse;

/**
 * move file or directory
 *
 * @example
 *
 * ```
 * ['@lila/move', {source, target}]
 * ```
 *
 * @param args
 * @param lila
 * @returns {function(*)}
 */
export const move = ({ args, lila }) => cb => {
  const { warn } = lila;

  const { source, target } = (args && args[0]) || {};

  if (!source) {
    warn('task skipped: source not configured');
    return cb();
  }

  if (!target) {
    warn('task skipped: target not configured');
    return cb();
  }

  moveSync(source, target);

  return cb();
};

/**
 * copy file or directory
 *
 * @example
 *
 * ```
 * ['@lila/copy', {source, target}]
 * ```
 *
 * @param args
 * @param lila
 * @returns {function(*)}
 */
export const copy = ({ args, lila }) => cb => {
  const { warn } = lila;

  const { source, target } = (args && args[0]) || {};

  if (!source) {
    warn('task skipped: source not configured');
    return cb();
  }

  if (!target) {
    warn('task skipped: target not configured');
    return cb();
  }

  copySync(source, target);

  return cb();
};

/**
 * delete files or directories
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
  const { warn } = lila;

  const dirs = args && args[0];

  if (!dirs) {
    warn('task skipped: files or directories not configured');
    return cb();
  }

  return del(dirs);
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
  const [devDir] = getSettings(['dev']);

  return del([devDir]);
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
  const [buildDir] = getSettings(['build']);

  return del([buildDir]);
};
