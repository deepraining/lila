const forEach = require('lodash/forEach');
const path = require('path');

const argv = require('../../data/argv');

const moduleName = argv.module;

const projectConfig = require('../../project_config');

let subDir = moduleName;
if (moduleName === '*' || moduleName === 'all') {
  subDir = '';
} else if (moduleName.slice(-2) === '/*') {
  subDir = moduleName.slice(0, -2);
}

// Prettier needs to change `process.argv`.
const oldProcessArgv = process.argv;
process.argv = oldProcessArgv.slice(0, 2);

process.argv.push(
  path.join(projectConfig.buildPaths.src.dir, subDir, '**/*.{js,jsx,ts,css,less,sass,scss,json,md}'),
  '--write'
);

if (projectConfig.prettierOptions) {
  forEach(projectConfig.prettierOptions, (value, key) => {
    process.argv.push(`--${key}`);
    value !== true && process.argv.push(value);
  });
}

require('prettier/bin-prettier');

// Restore `process.argv`.
process.argv = oldProcessArgv;
