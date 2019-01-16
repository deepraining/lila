import commander from 'commander';
import inquirer from 'inquirer';

import create from './create';

// this should be dynamically imported, for lerna will modify package.json
const pkg = require('../package.json');

// version
commander
  .version(pkg.version)
  .arguments('<project-directory>')
  .action(dir => {
    inquirer
      .prompt([
        {
          type: 'list',
          name: 'type',
          message: 'Which type do you want to choose?',
          choices: [
            {
              name:
                'base: universal structure to work with webpack, rollup, ...',
              value: 'base',
              short: 'base',
            },
            {
              name: 'webpack: ready-made structure for webpack application',
              value: 'webpack',
              short: 'webpack',
            },
            {
              name:
                'webpack-lib: ready-made structure for webpack library project',
              value: 'webpack-lib',
              short: 'webpack-lib',
            },
            {
              name: 'rollup: ready-made structure for rollup library project',
              value: 'rollup',
              short: 'rollup',
            },
          ],
        },
      ])
      .then(({ type }) => {
        create({ dir, type });
      });
  });

commander.parse(process.argv);
