import fs from 'fs';
import path from 'path';
import cp from 'child_process';
import shell from 'shelljs';
import fse from 'fs-extra';
import { error, info, log } from './logger';
import { baseType, universalType, reactType, vueType } from './data';

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

  const copyEslintConfig = () => {
    if (type === universalType || type === baseType) {
      copy({ file: '.eslintrc.js', srcFile: 'base.eslintrc.js' });
    } else if (type === reactType) {
      copy({ file: '.eslintrc.js', srcFile: 'react-app.eslintrc.js' });
    } else if (type === vueType) {
      copy({ file: '.eslintrc.js', srcFile: 'vue-app.eslintrc.js' });
      copy({ file: '.eslintrc.vue.js', srcFile: 'vue-app.eslintrc.vue.js' });
    }
  };

  const copyPkg = () => {
    if (type === universalType || type === baseType) {
      copy({ file: 'package.json', srcFile: 'base.package.json', replace: !0 });
    } else if (type === reactType) {
      copy({
        file: 'package.json',
        srcFile: 'react.package.json',
        replace: !0,
      });
    } else if (type === vueType) {
      copy({ file: 'package.json', srcFile: 'vue.package.json', replace: !0 });
    }
  };

  copy({ file: '.editorconfig' });
  copy({ file: '.eslintignore' });
  copy({ file: '.flowconfig' });
  copy({ file: '.gitignore' });
  copy({ file: '.npmrc' });
  copy({ file: '.prettierignore' });
  copy({ file: '.prettierrc.js' });
  copy({ file: '.stylelintignore' });
  copy({ file: '.stylelintrc.js' });
  copy({ file: 'CHANGELOG.md' });
  copy({ file: 'jest.config.js' });
  copy({ file: 'README.md', replace: !0 });

  copyEslintConfig();

  copy({ file: 'lila.init.js', srcFile: `lila-${type}.js` });

  copyPkg();

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

    const lilaPkg = ['lila-bin', 'lila-core', 'lila-tasks'];

    if (type !== universalType) {
      lilaPkg.push('lila-webpack', 'lila-webpack-config');
    }

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
