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
