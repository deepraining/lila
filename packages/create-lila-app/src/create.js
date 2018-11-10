import fs from 'fs';
import path from 'path';
import cp from 'child_process';
import shell from 'shelljs';
import fse from 'fs-extra';
import { error, info, log } from '../../../util/logger';

const { join } = path;
const { existsSync } = fs;
const { which, exec } = shell;
const { readFileSync, outputFileSync } = fse;
const { spawn } = cp;

export default ({ dir, type }) => {
  if (!which('git')) {
    error(`
  error: missing git
    `);
    process.exit(1);
  }

  const cwd = process.cwd();
  const source = join(__dirname, '../files');
  const target = join(cwd, dir);

  if (existsSync(target)) {
    error(`
  error: ${dir} existed  
    `);
    process.exit(1);
  }

  const copy = ({ file, replace = !1, srcFile }) => {
    const sourceFile = join(source, srcFile || `_${file}`);
    const targetFile = join(target, file);

    let content = readFileSync(sourceFile, 'utf8');

    if (replace) content = content.replace('[project-name]', dir);

    outputFileSync(targetFile, content);
  };

  copy({ file: '.editorconfig' });
  copy({ file: '.eslintignore' });
  copy({ file: '.eslintrc.js' });
  copy({ file: '.gitignore' });
  copy({ file: '.npmrc' });
  copy({ file: '.prettierignore' });
  copy({ file: '.prettierrc.js' });
  copy({ file: '.stylelintignore' });
  copy({ file: '.stylelintrc.js' });
  copy({ file: 'CHANGELOG.md' });
  copy({ file: 'jest.config.js' });
  copy({ file: 'package.json', replace: !0 });
  copy({ file: 'README.md', replace: !0 });

  copy({ file: 'lila.js', srcFile: `lila-${type}.js` });

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

  let npm = 'npm';
  if (which('cnpm')) npm = 'cnpm';

  log(`
  ${npm} install ...
  `);

  const child = spawn(npm, ['install'], { stdio: 'inherit' });

  child.on('close', code => {
    if (code !== 0) process.exit(1);

    const lilaPkg = ['lila-cli', 'lila-core', 'lila-tasks'];

    if (type === 'webpack') lilaPkg.push('lila-webpack', 'lila-webpack-config');
    else if (type === 'webpack-lib')
      lilaPkg.push('lila-webpack-lib', 'lila-webpack-lib-config');
    else if (type === 'rollup')
      lilaPkg.push('lila-rollup', 'lila-rollup-config');

    const child2 = spawn(npm, ['install', '--save-dev', ...lilaPkg], {
      stdio: 'inherit',
    });

    child2.on('close', code2 => {
      if (code2 !== 0) process.exit(1);

      info(`
  ${dir} created  
      `);
    });
  });
};
