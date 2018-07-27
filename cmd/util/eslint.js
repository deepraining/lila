const path = require('path');
const esLint = require('eslint');

const CLIEngine = esLint.CLIEngine;

const argv = require('../../data/argv');
const projectConfig = require('../../project_config');

const options = projectConfig.esLintOptions || {};
options.fix = !!projectConfig.esLintFix;
const cli = new CLIEngine(options);

const modules = argv.module.split(',');
const moduleDirs = modules.map(moduleName => {
  if (moduleName === '*' || moduleName === 'all') return '';
  else if (moduleName.slice(-2) === '/*') return moduleName.slice(0, -2);
  else return moduleName;
});
const modulePaths = moduleDirs.map(dir => path.join(projectConfig.buildPaths.src.dir, dir));

const formatter = cli.getFormatter();
const report = cli.executeOnFiles(modulePaths);

// Output fixes to disk.
options.fix && CLIEngine.outputFixes(report);

if (report.errorCount > 0) {
  console.log(formatter(report.results));
  process.exit(1);
}
