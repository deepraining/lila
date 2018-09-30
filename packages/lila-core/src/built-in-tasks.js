import path from 'path';
import fse from 'fs-extra';
import SSH from 'gulp-ssh';

export const correctHtml = ({ page, args }, lila) => cb => {
  const { getSetting } = lila;
  const buildRoot = getSetting('buildRoot');

  fse.moveSync(
    path.join(buildRoot, 'index.html'),
    path.join(buildRoot, args[0] || '', `${page}.html`)
  );

  return cb();
};

export const replaceHtml = ({ page, args }, lila) => cb => {
  console.log(page);
  const { getSetting } = lila;
  const buildRoot = getSetting('buildRoot');

  const [replace, filePath = 'index.html'] = args;

  const fullFilePath = path.join(buildRoot, filePath);
  let content = fse.readFileSync(fullFilePath, 'utf8');

  if (!Array.isArray(replace)) return cb();

  replace.forEach(item => {
    const { target, replacement } = item;

    content = content.replace(target, replacement);
  });

  fse.outputFileSync(fullFilePath, content);

  return cb();
};

export const insertHtml = ({ page, args }, lila) => cb => {
  console.log(page);
  const { getSetting } = lila;
  const buildRoot = getSetting('buildRoot');

  const [insert, filePath = 'index.html'] = args;

  const fullFilePath = path.join(buildRoot, filePath);
  let content = fse.readFileSync(fullFilePath, 'utf8');

  if (!insert) return cb();

  const { start, end } = insert;

  if (start) content = start + content;
  if (end) content += end;

  fse.outputFileSync(fullFilePath, content);

  return cb();
};

export const convertHtml = ({ page, args }, lila) => cb => {
  console.log(page);
  const { getSetting } = lila;
  const buildRoot = getSetting('buildRoot');

  const [ext, filePath = 'index.html'] = args;

  const fullFilePath = path.join(buildRoot, filePath);

  fse.moveSync(fullFilePath, fullFilePath.slice(-4) + ext);

  return cb();
};

export const renameHtml = ({ page, args }, lila) => cb => {
  console.log(page);
  const { getSetting } = lila;
  const buildRoot = getSetting('buildRoot');

  const options = args[0];
  const { target, source } = options;

  fse.moveSync(path.join(buildRoot, source), path.join(buildRoot, target));

  return cb();
};

export const syncAll = ({ page, args, gulp }, lila) => () => {
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

export const syncHtml = ({ page, args, gulp }, lila) => () => {
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
