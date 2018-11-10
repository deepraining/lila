import commander from 'commander';
import inquirer from 'inquirer';

import pkg from '../package.json';
import create from './create';

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
                'base: universal structure to work with webpack, rollup, next.js, ...',
              value: 'base',
              short: 'base',
            },
            {
              name: 'webpack: ready-made structure to webpack application',
              value: 'webpack',
              short: 'webpack',
            },
            {
              name:
                'webpack-lib: ready-made structure to webpack library application',
              value: 'webpack-lib',
              short: 'webpack-lib',
            },
            {
              name:
                'rollup: ready-made structure to rollup library application',
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
