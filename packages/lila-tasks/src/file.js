import fse from 'fs-extra';

const { moveSync, readFileSync, outputFileSync, copySync } = fse;

/**
 * replace file content
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
  const { warn } = lila;
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

  let content = readFileSync(file, 'utf8');

  replacing.forEach(item => {
    const { target, replacement } = item;

    content = content.replace(target, replacement);
  });

  outputFileSync(file, content);

  return cb();
};

/**
 * insert file content
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
  const { warn } = lila;
  const { file, start, end } = (args && args[0]) || {};

  if (!file) {
    warn('task skipped: file not configured');
    return cb();
  }
  if (!start && !end) {
    warn('task skipped: both start and end are empty');
    return cb();
  }

  let content = readFileSync(file, 'utf8');

  if (start) content = start + content;
  if (end) content += end;

  outputFileSync(file, content);

  return cb();
};

/**
 * convert file extension
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
  const { warn } = lila;

  const { file, ext } = (args && args[0]) || {};

  if (!file) {
    warn('task skipped: file not configured');
    return cb();
  }
  if (!ext) {
    warn('task skipped: ext not configured');
    return cb();
  }

  const fullExt = ext.slice(0, 1) === '.' ? ext : `.${ext}`;
  moveSync(file, file.slice(0, file.lastIndexOf('.')) + fullExt);

  return cb();
};

/**
 * backup file
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
  const { warn } = lila;

  const { file, suffix = new Date().getTime() } = (args && args[0]) || {};

  if (!file) {
    warn('task skipped: file not configured');
    return cb();
  }

  const index = file.slice(0, file.lastIndexOf('.'));

  copySync(file, `${file.slice(0, index)}.${suffix}${file.slice(index)}`);

  return cb();
};
