import del from 'del';
import path from 'path';
import fse from 'fs-extra';

const { join } = path;
const { copySync, moveSync } = fse;

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

/**
 * delete directories(relative to cwd)
 *
 * @example
 *
 * ```
 * ['@lila/del-dir', dir]
 * ['@lila/del-dir', [dir1, dir2, dir3, ...]]
 * ```
 *
 * @param args
 * @param lila
 * @returns {function()}
 */
export const delDir = ({ args, lila }) => () => {
  const { getSettings } = lila;
  const [cwd] = getSettings(['cwd']);
  let dirs = (args && args[0]) || [];

  if (Array.isArray(dirs)) dirs = [dirs];

  return del(dirs.map(dir => `${cwd}/${dir}`));
};

/**
 * copy directory(relative to cwd)
 *
 * @example
 *
 * ```
 * ['@lila/copy-dir', {source, target}]
 * ```
 *
 * @param args
 * @param lila
 * @returns {function(*)}
 */
export const copyDir = ({ args, lila }) => cb => {
  const { getSetting } = lila;
  const cwd = getSetting('cwd');
  const { source, target } = (args && args[0]) || {};

  copySync(join(cwd, source), join(cwd, target));

  return cb();
};

/**
 * move directory(relative to cwd)
 *
 * @example
 *
 * ```
 * ['@lila/move-dir', {source, target}]
 * ```
 *
 * @param args
 * @param lila
 * @returns {function(*)}
 */
export const moveDir = ({ args, lila }) => cb => {
  const { getSetting } = lila;
  const cwd = getSetting('cwd');
  const { source, target } = (args && args[0]) || {};

  moveSync(join(cwd, source), join(cwd, target));

  return cb();
};
