import path from 'path';
import fse from 'fs-extra';

const { join } = path;
const { moveSync, readFileSync, outputFileSync, copySync } = fse;

/**
 * replace file content
 *
 * @example
 *
 * ```
 * ['@lila/replace', {file, replace: [{target, replacement}], relative}]
 * ```
 *
 * @param args
 * @param lila
 * @returns {function(*)}
 */
export const replace = ({ args, lila }) => cb => {
  const { getSetting } = lila;
  const buildDir = getSetting('build');

  const { file, replace: replacing, relative = buildDir } =
    (args && args[0]) || {};

  if (!file) throw new Error('file not configured');
  if (!replacing) throw new Error('replace not configured');
  if (!Array.isArray(replacing)) throw new Error('replace should be an array');

  const filePath = join(relative, file);
  let content = readFileSync(filePath, 'utf8');

  replacing.forEach(item => {
    const { target, replacement } = item;

    content = content.replace(target, replacement);
  });

  outputFileSync(filePath, content);

  return cb();
};

/**
 * insert file content
 *
 * @example
 *
 * ```
 * ['@lila/insert', {file, start, end, relative}]
 * ```
 *
 * @param args
 * @param lila
 * @returns {function(*)}
 */
export const insert = ({ args, lila }) => cb => {
  const { getSetting } = lila;
  const buildDir = getSetting('build');

  const { file, start, end, relative = buildDir } = (args && args[0]) || {};

  if (!start && !end) return cb();

  const filePath = join(relative, file);
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
 * @param entry
 * @param args
 * @param lila
 * @returns {function(*)}
 */
export const convertHtml = ({ entry, args, lila }) => cb => {
  const { getSetting } = lila;
  const buildDir = getSetting('build');

  const { file = `${entry}.html`, ext = '' } = (args && args[0]) || {};

  if (!ext) return cb();

  const filePath = join(buildDir, file);

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
 * @param entry
 * @param args
 * @param lila
 * @returns {function(*)}
 */
export const backupHtml = ({ entry, args, lila }) => cb => {
  const { getSetting } = lila;
  const buildDir = getSetting('build');

  const { suffix = new Date().getTime(), ext = 'html' } =
    (args && args[0]) || {};

  copySync(
    join(buildDir, `${entry}.${ext}`),
    join(buildDir, `${entry}.${suffix}.${ext}`)
  );

  return cb();
};

/**
 * rename html path
 *
 * @example
 *
 * ```
 * ['@lila/rename-html', {entry, ext}]
 * ```
 *
 * @param entry
 * @param args
 * @param lila
 * @returns {function(*)}
 */
export const renameHtml = ({ entry, args, lila }) => cb => {
  const { getSetting } = lila;
  const buildDir = getSetting('build');

  const { entry: newEntry = '', ext = 'html' } = (args && args[0]) || {};

  if (!newEntry) return cb();

  moveSync(
    join(buildDir, `${entry}.${ext}`),
    join(buildDir, `${newEntry}.${ext}`)
  );

  return cb();
};
