import fs from 'fs';
import path from 'path';
import fse from 'fs-extra';

const { existsSync } = fs;
const { join } = path;
const { moveSync, readFileSync, outputFileSync, copySync } = fse;

/**
 * create a file(relative to `root`)
 *
 * @example
 *
 * ```
 * ['@lila/make', {file, content, force}]}]
 * ```
 *
 * @param args
 * @param lila
 * @returns {function(*)}
 */
export const make = ({ args, lila }) => cb => {
  const { warn, getSettings } = lila;
  const { file, content = '', force = !1 } = (args && args[0]) || {};

  if (!file) {
    warn('task skipped: file not configured');
    return cb();
  }

  const [root] = getSettings(['root']);
  const filePath = join(root, file);

  if (existsSync(filePath) && !force) {
    warn('task skipped: file existed');
    return cb();
  }

  outputFileSync(filePath, content);

  return cb();
};

/**
 * replace file content(relative to `root`)
 *
 * @example
 *
 * ```
 * ['@lila/replace', {file, replace: [{target, replacement}]}]
 * ```
 *
 * @param args
 * @param lila
 * @returns {function(*)}
 */
export const replace = ({ args, lila }) => cb => {
  const { warn, getSettings } = lila;
  const { file, replace: replacing } = (args && args[0]) || {};

  if (!file) {
    warn('task skipped: file not configured');
    return cb();
  }
  if (!replacing) {
    warn('task skipped: replace not configured');
    return cb();
  }
  if (!Array.isArray(replacing)) {
    warn('task skipped: replace should be an array');
    return cb();
  }

  const [root] = getSettings(['root']);
  const filePath = join(root, file);

  if (!existsSync(filePath)) {
    warn('task skipped: file not exist');
    return cb();
  }

  let content = readFileSync(filePath, 'utf8');

  replacing.forEach(item => {
    const { target, replacement } = item;

    content = content.replace(target, replacement);
  });

  outputFileSync(filePath, content);

  return cb();
};

/**
 * insert file content(relative to `root`)
 *
 * @example
 *
 * ```
 * ['@lila/insert', {file, start, end}]
 * ```
 *
 * @param args
 * @param lila
 * @returns {function(*)}
 */
export const insert = ({ args, lila }) => cb => {
  const { warn, getSettings } = lila;
  const { file, start, end } = (args && args[0]) || {};

  if (!file) {
    warn('task skipped: file not configured');
    return cb();
  }
  if (!start && !end) {
    warn('task skipped: both start and end are empty');
    return cb();
  }

  const [root] = getSettings(['root']);
  const filePath = join(root, file);

  if (!existsSync(filePath)) {
    warn('task skipped: file not exist');
    return cb();
  }

  let content = readFileSync(filePath, 'utf8');

  if (start) content = start + content;
  if (end) content += end;

  outputFileSync(filePath, content);

  return cb();
};

/**
 * convert file extension(relative to `root`)
 *
 * @example
 *
 * ```
 * ['@lila/convert', {file, ext}]
 * ```
 *
 * @param args
 * @param lila
 * @returns {function(*)}
 */
export const convert = ({ args, lila }) => cb => {
  const { warn, getSettings } = lila;

  const { file, ext } = (args && args[0]) || {};

  if (!file) {
    warn('task skipped: file not configured');
    return cb();
  }
  if (!ext) {
    warn('task skipped: ext not configured');
    return cb();
  }

  const [root] = getSettings(['root']);
  const filePath = join(root, file);

  if (!existsSync(filePath)) {
    warn('task skipped: file not exist');
    return cb();
  }

  const fullExt = ext.slice(0, 1) === '.' ? ext : `.${ext}`;
  moveSync(filePath, filePath.slice(0, filePath.lastIndexOf('.')) + fullExt);

  return cb();
};

/**
 * backup file(relative to `root`)
 *
 * @example
 *
 * ```
 * ['@lila/backup', {file, suffix}]
 * ```
 *
 * @param args
 * @param lila
 * @returns {function(*)}
 */
export const backup = ({ args, lila }) => cb => {
  const { warn, getSettings } = lila;

  const { file, suffix = new Date().getTime() } = (args && args[0]) || {};

  if (!file) {
    warn('task skipped: file not configured');
    return cb();
  }

  const [root] = getSettings(['root']);
  const filePath = join(root, file);

  if (!existsSync(filePath)) {
    warn('task skipped: file not exist');
    return cb();
  }

  const index = filePath.lastIndexOf('.');

  copySync(
    filePath,
    `${filePath.slice(0, index)}.${suffix}${filePath.slice(index)}`
  );

  return cb();
};
