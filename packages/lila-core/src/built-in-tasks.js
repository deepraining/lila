import fs from 'fs';
import path from 'path';
import fse from 'fs-extra';
import SSH from 'gulp-ssh';
import { tmpDir } from './app';
import changedFiles from '../util/changed';

const { existsSync, writeFileSync } = fs;
const { join } = path;
const { moveSync, readFileSync, outputFileSync } = fse;

// index.html => test/index.html
export const correctHtml = ({ page, args, lila }) => cb => {
  const { getSettings } = lila;
  const [buildDir, appDir] = getSettings(['buildDir', 'appDir']);
  const buildPath = join(appDir, buildDir);
  const { source = 'index.html', target = `${page}.html` } =
    (args && args[0]) || {};

  moveSync(join(buildPath, source), join(buildPath, target));

  return cb();
};

export const replaceHtml = ({ page, args, lila }) => cb => {
  const { getSettings } = lila;
  const [buildDir, appDir] = getSettings(['buildDir', 'appDir']);
  const buildPath = join(appDir, buildDir);

  const { file = `${page}.html`, replace = [] } = (args && args[0]) || {};

  if (!Array.isArray(replace)) return cb();

  const filePath = join(buildPath, file);
  let content = readFileSync(filePath, 'utf8');

  replace.forEach(item => {
    const { target, replacement } = item;

    content = content.replace(target, replacement);
  });

  outputFileSync(filePath, content);

  return cb();
};

export const insertHtml = ({ page, args, lila }) => cb => {
  const { getSettings } = lila;
  const [buildDir, appDir] = getSettings(['buildDir', 'appDir']);
  const buildPath = join(appDir, buildDir);

  const { file = `${page}.html`, insert = {} } = (args && args[0]) || {};

  if (!insert) return cb();

  const filePath = join(buildPath, file);
  let content = readFileSync(filePath, 'utf8');

  const { start, end } = insert;

  if (start) content = start + content;
  if (end) content += end;

  outputFileSync(filePath, content);

  return cb();
};

export const convertHtml = ({ page, args, lila }) => cb => {
  const { getSettings } = lila;
  const [buildDir, appDir] = getSettings(['buildDir', 'appDir']);
  const buildPath = join(appDir, buildDir);

  const { file = `${page}.html`, ext = '' } = (args && args[0]) || {};

  if (!ext) return cb();

  const filePath = join(buildPath, file);

  moveSync(filePath, filePath.slice(-4) + ext);

  return cb();
};

export const renameHtml = ({ page, args, lila }) => cb => {
  const { getSettings } = lila;
  const [buildDir, appDir] = getSettings(['buildDir', 'appDir']);
  const buildPath = join(appDir, buildDir);

  const { target = '', ext = 'html' } = (args && args[0]) || {};

  if (!target) return cb();

  moveSync(
    join(buildPath, `${page}.${ext}`),
    join(buildPath, `${target}.${ext}`)
  );

  return cb();
};

const newCacheJson = {};
export const syncAll = ({ page, args, gulp, lila }) => () => {
  const { getSettings } = lila;
  const [buildDir, appDir] = getSettings(['buildDir', 'appDir']);

  const { server, remotePath, extra = [], cache, cacheFileName = 'cache' } =
    (args && args[0]) || {};

  if (!server) throw new Error('server info not configured');
  if (!remotePath) throw new Error('remotePath not configured');

  let src = [buildDir, ...extra].map(dir => `${appDir}/${dir}/**/*`);

  if (cache) {
    const cacheFile = `${tmpDir}/${cacheFileName}.json`;
    const oldJson = existsSync(cacheFile) ? require(cacheFile) : {}; // eslint-disable-line
    const { json, changed } = changedFiles(
      [buildDir, ...extra],
      appDir,
      oldJson
    );

    src = changed;
    newCacheJson[page] = json;
  }

  const connect = new SSH(server);

  return gulp.src(src, { base: appDir }).pipe(connect.dest(remotePath));
};

export const saveCache = ({ page, args }) => cb => {
  const { cacheFileName = 'cache' } = (args && args[0]) || {};
  const cacheFile = `${tmpDir}/${cacheFileName}.json`;
  const json = newCacheJson[page] || {};

  writeFileSync(cacheFile, JSON.stringify(json));

  return cb();
};

export const syncHtml = ({ args, gulp, lila }) => () => {
  const { getSettings } = lila;
  const [buildDir, appDir] = getSettings(['buildDir', 'appDir']);
  const buildPath = join(appDir, buildDir);

  const { server, remotePath, ext = 'html' } = (args && args[0]) || {};

  if (!server) throw new Error('server info not configured');
  if (!remotePath) throw new Error('remotePath not configured');

  const connect = new SSH(server);

  return gulp
    .src(`${buildPath}/**/*.${ext}`, { base: appDir })
    .pipe(connect.dest(remotePath));
};
