const path = require('path');
const stylelint = require('stylelint');

const formatter = stylelint.formatters.string;

const argv = require('../../data/argv');

const moduleName = argv.module;

const projectConfig = require('../../project_config');

let subDir = moduleName;
if (moduleName === '*') {subDir = '';}
else if (moduleName.slice(-1) === '*') {subDir = moduleName.slice(0, -2);}

const options = projectConfig.styleLintOptions || {};
options.fix = !!projectConfig.styleLintFix;
options.files = [
  path.join(projectConfig.buildPaths.src.dir, subDir, '**/*.css'),
  path.join(projectConfig.buildPaths.src.dir, subDir, '**/*.less'),
  path.join(projectConfig.buildPaths.src.dir, subDir, '**/*.scss'),
  path.join(projectConfig.buildPaths.src.dir, subDir, '**/*.sass'),
];

module.exports = cb => {
  (async () => {
    try {
      const result = await stylelint.lint(options);

      if (result.errored) {
        console.log(formatter(result.results));
        process.exit(1);
      }

      cb();
    } catch (err) {
      console.error(err.stack);
      process.exit(1);
    }
  })();
};
