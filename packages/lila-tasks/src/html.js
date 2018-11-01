import path from 'path';
import fse from 'fs-extra';

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
 * @param entry
 * @param args
 * @param lila
 * @returns {function(*)}
 */
export const correctHtml = ({ entry, args, lila }) => cb => {
  const { getSetting } = lila;
  const buildDir = getSetting('build');
  const { source = 'index.html', target = `${entry}.html` } =
    (args && args[0]) || {};

  moveSync(
    join(buildDir, source),
    join(buildDir, typeof target === 'function' ? target(entry) : target)
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
 * @param entry
 * @param args
 * @param lila
 * @returns {function(*)}
 */
export const replaceHtml = ({ entry, args, lila }) => cb => {
  const { getSetting } = lila;
  const buildDir = getSetting('build');

  const { file = `${entry}.html`, replace = [] } = (args && args[0]) || {};

  if (!Array.isArray(replace)) return cb();

  const filePath = join(
    buildDir,
    typeof file === 'function' ? file(entry) : file
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
 * @param entry
 * @param args
 * @param lila
 * @returns {function(*)}
 */
export const insertHtml = ({ entry, args, lila }) => cb => {
  const { getSetting } = lila;
  const buildDir = getSetting('build');

  const { file = `${entry}.html`, start, end } = (args && args[0]) || {};

  if (!start && !end) return cb();

  const filePath = join(
    buildDir,
    typeof file === 'function' ? file(entry) : file
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

  const filePath = join(
    buildDir,
    typeof file === 'function' ? file(entry) : file
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
    join(
      buildDir,
      `${typeof newEntry === 'function' ? newEntry(entry) : newEntry}.${ext}`
    )
  );

  return cb();
};
