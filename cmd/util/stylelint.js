const path = require('path');
const stylelint = require('stylelint');

const formatter = stylelint.formatters.string;

const argv = require('../../data/argv');

const projectConfig = require('../../project_config');

const modules = argv.module.split(',');
const moduleDirs = modules.map(moduleName => {
  if (moduleName === '*' || moduleName === 'all') return '';
  else if (moduleName.slice(-2) === '/*') return moduleName.slice(0, -2);
  else return moduleName;
});
const moduleFiles = [];
const extensions = ['css', 'less', 'scss', 'sass'];
moduleDirs.forEach(dir => {
  extensions.forEach(ext => {
    moduleFiles.push(path.join(projectConfig.buildPaths.src.dir, dir, '**/*.' + ext));
  });
});

const options = projectConfig.styleLintOptions || {};
options.fix = !!projectConfig.styleLintFix;
options.files = moduleFiles;

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
