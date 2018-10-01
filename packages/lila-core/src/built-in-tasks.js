import path from 'path';
import fse from 'fs-extra';
import SSH from 'gulp-ssh';

const { join } = path;
const { moveSync, readFileSync, outputFileSync } = fse;

export const correctHtml = ({ page, args, lila }) => cb => {
  const { getSettings } = lila;
  const [buildDir, appDir] = getSettings(['buildDir', 'appDir']);
  const buildPath = join(appDir, buildDir);
  const { source, target } = (args && args[0]) || {
    source: 'index.html',
    target: `${page}.html`,
  };

  moveSync(join(buildPath, source), join(buildPath, target));

  return cb();
};

export const replaceHtml = ({ page, args, lila }) => cb => {
  console.log(page);
  const { getSetting } = lila;
  const buildRoot = getSetting('buildRoot');

  const [replace, filePath = 'index.html'] = args;

  const fullFilePath = join(buildRoot, filePath);
  let content = readFileSync(fullFilePath, 'utf8');

  if (!Array.isArray(replace)) return cb();

  replace.forEach(item => {
    const { target, replacement } = item;

    content = content.replace(target, replacement);
  });

  outputFileSync(fullFilePath, content);

  return cb();
};

export const insertHtml = ({ page, args, lila }) => cb => {
  console.log(page);
  const { getSetting } = lila;
  const buildRoot = getSetting('buildRoot');

  const [insert, filePath = 'index.html'] = args;

  const fullFilePath = join(buildRoot, filePath);
  let content = readFileSync(fullFilePath, 'utf8');

  if (!insert) return cb();

  const { start, end } = insert;

  if (start) content = start + content;
  if (end) content += end;

  outputFileSync(fullFilePath, content);

  return cb();
};

export const convertHtml = ({ page, args, lila }) => cb => {
  console.log(page);
  const { getSetting } = lila;
  const buildRoot = getSetting('buildRoot');

  const [ext, filePath = 'index.html'] = args;

  const fullFilePath = join(buildRoot, filePath);

  moveSync(fullFilePath, fullFilePath.slice(-4) + ext);

  return cb();
};

export const renameHtml = ({ page, args, lila }) => cb => {
  console.log(page);
  const { getSetting } = lila;
  const buildRoot = getSetting('buildRoot');

  const options = args[0];
  const { target, source } = options;

  moveSync(join(buildRoot, source), join(buildRoot, target));

  return cb();
};

export const syncAll = ({ page, args, gulp, lila }) => () => {
  console.log(page);
  const { getSetting } = lila;
  const buildRoot = getSetting('buildRoot');
  const webRoot = getSetting('webRoot');

  const options = args[0];
  const { server, remotePath } = options;

  const connect = new SSH(server);

  return gulp
    .src(`${buildRoot}/**/*`, { base: webRoot })
    .pipe(connect.dest(remotePath));
};

export const syncHtml = ({ page, args, gulp, lila }) => () => {
  console.log(page);
  const { getSetting } = lila;
  const buildRoot = getSetting('buildRoot');

  const options = args[0];
  const { server, remotePath } = options;

  const connect = new SSH(server);

  return gulp
    .src(`${buildRoot}/**/*.html`, { base: buildRoot })
    .pipe(connect.dest(remotePath));
};
