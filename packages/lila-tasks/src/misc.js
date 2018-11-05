import fs from 'fs';
import path from 'path';
import rd from 'rd';
import child from 'child_process';
import md5 from 'crypto-md5';
import fse from 'fs-extra';

const { spawn } = child;
const { existsSync, readFileSync, writeFileSync } = fs;
const { join, relative } = path;
const { eachFileFilterSync } = rd;
const { removeSync } = fse;

/**
 * execute shell scripts
 *
 * @example
 *
 * ```
 * ['@lila/shell', {command, args, options}]
 * ```
 *
 * @param args
 * @param lila
 * @returns {Function}
 */
export const shell = ({ args, lila }) => cb => {
  const { log, error } = lila;
  const { command, args: shellArgs, options } = (args && args[0]) || {};

  if (!command) throw new Error('command not configured');

  const pro = spawn(command, shellArgs, options);

  pro.stdout.on('data', data => {
    log(data);
  });

  pro.stderr.on('data', data => {
    error(data);
  });

  pro.on('close', code => {
    if (code < 1) cb();
    else process.exit(1);
  });
};

/**
 * remove handled files by last handling, and remain new files
 *
 * @example
 *
 * ```
 * ['@lila/clean-cache', {dir, cacheFileName}]
 * ```
 *
 * @param args
 * @param lila
 * @returns {function(*)}
 */
export const cleanCache = ({ args, lila }) => cb => {
  const { dir, cacheFileName = 'cache' } = (args && args[0]) || {};

  if (!dir) return cb();

  const { getSettings } = lila;
  const [cwd, tmpDir] = getSettings(['cwd', 'tmp']);
  const dirPath = join(cwd, dir);

  const cacheFile = `${cwd}/${tmpDir}/${cacheFileName}.json`;
  const json = existsSync(cacheFile) ? require(cacheFile) : {}; // eslint-disable-line

  eachFileFilterSync(dirPath, file => {
    const key = relative(dirPath, file);
    const content = readFileSync(file);
    const hash = md5(content, 'hex');

    if (json[key] === hash) removeSync(file);
  });

  return cb();
};

/**
 * save files handling record
 *
 * @example
 *
 * ```
 * ['@lila/save-cache', {dir, cacheFileName}]
 * ```
 *
 * @param args
 * @param lila
 * @returns {function(*)}
 */
export const saveCache = ({ args, lila }) => cb => {
  const { dir, cacheFileName = 'cache' } = (args && args[0]) || {};

  if (!dir) return cb();

  const { getSettings } = lila;
  const [cwd, tmpDir] = getSettings(['cwd', 'tmp']);
  const dirPath = join(cwd, dir);

  const cacheFile = `${cwd}/${tmpDir}/${cacheFileName}.json`;
  const json = existsSync(cacheFile) ? require(cacheFile) : {}; // eslint-disable-line

  eachFileFilterSync(dirPath, file => {
    const key = relative(dirPath, file);
    const content = readFileSync(file);

    json[key] = md5(content, 'hex');
  });

  writeFileSync(cacheFile, JSON.stringify(json));

  return cb();
};
