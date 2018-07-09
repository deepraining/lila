const path = require('path');
const esLint = require('eslint');
const CLIEngine = esLint.CLIEngine;

const argv = require('../../data/argv');
const moduleName = argv.module;

const projectConfig = require('../../project_config');

let options = projectConfig.esLintOptions || {};
options.fix = !!projectConfig.esLintFix;
let cli = new CLIEngine(options);

let subDir = moduleName;
if (moduleName === '*') subDir = '';
else if (moduleName.slice(-1) === '*') subDir = moduleName.slice(0, -2);

let formatter = cli.getFormatter();
let report = cli.executeOnFiles([path.join(projectConfig.buildPaths.src.dir, subDir)]);

// Output fixes to disk.
options.fix && CLIEngine.outputFixes(report);

if (report.errorCount > 0) {
  console.log(formatter(report.results));
  process.exit(1);
}
