const forEach = require('lodash/forEach');
const path = require('path');

const argv = require('../../data/argv');

const projectConfig = require('../../project_config');

const modules = argv.module.split(',');
const moduleDirs = modules.map(moduleName => {
  if (moduleName === '*' || moduleName === 'all') return '';
  else if (moduleName.slice(-2) === '/*') return moduleName.slice(0, -2);
  else return moduleName;
});

// Prettier needs to change `process.argv`.
const oldProcessArgv = process.argv;
process.argv = oldProcessArgv.slice(0, 2);

process.argv.push(
  path.join(
    projectConfig.buildPaths.src.dir,
    moduleDirs.length < 2 ? moduleDirs[0] : `{${moduleDirs.join(',')}}`,
    '**/*.{js,jsx,ts,css,less,sass,scss,json,md}'
  ),
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
