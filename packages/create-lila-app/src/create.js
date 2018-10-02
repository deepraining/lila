import fs from 'fs';
import path from 'path';
import shell from 'shelljs';
import fse from 'fs-extra';
import { missingGit } from '../util/error';
import copyExtra from './copy-extra';
import { error, info, log } from '../../../util/logger';

const { join } = path;
const { existsSync } = fs;
const { which, exec } = shell;
const { copySync } = fse;

export default (dir, install) => {
  if (!which('git')) missingGit();

  const cwd = process.cwd();
  const source = join(__dirname, '../boilerplate');
  const target = join(cwd, dir);

  if (existsSync(target)) {
    error(`
  error: ${dir} existed  
    `);
    process.exit(1);
  }

  copySync(source, target);
  copyExtra(target, 'package.json', dir);
  copyExtra(target, 'README.md', dir);
  process.chdir(target);

  log(`
  git init ...
  `);
  if (exec('git init').code !== 0) {
    error(`
  error: git init  
    `);
    process.exit(1);
  }

  if (!install) {
    info(`
  ${dir} created  
    `);
    return;
  }

  let npm = 'npm';
  if (which('cnpm')) npm = 'cnpm';

  log(`
  ${npm} install ...
  `);

  if (exec(`${npm} install`).code !== 0) {
    error(`
  error: ${npm} install  
    `);
    process.exit(1);
  }

  info(`
  ${dir} created  
  `);
};
