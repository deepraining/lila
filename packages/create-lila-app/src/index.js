import commander from 'commander';

import pkg from '../package.json';
import create from './create';

// version
commander
  .version(pkg.version)
  .arguments('<project-directory>')
  .option('-i, --install', 'create application with installing dependencies')
  .action((dir, { install }) => {
    create(dir, install);
  });

commander.parse(process.argv);
