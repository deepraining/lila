import commander from 'commander';
import inquirer from 'inquirer';

import create from './create';
import { universalType, baseType, reactType, vueType } from './data';

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
          pageSize: 100,
          choices: [
            {
              name: `${universalType}: universal environment to build with webpack, rollup, ...`,
              value: universalType,
              short: universalType,
            },
            {
              name: `${baseType}: ready-made environment to build base application by webpack`,
              value: baseType,
              short: baseType,
            },
            {
              name: `${reactType}: ready-made environment to build React application by webpack`,
              value: reactType,
              short: reactType,
            },
            {
              name: `${vueType}: ready-made environment to build Vue application by webpack`,
              value: vueType,
              short: vueType,
            },
          ],
        },
      ])
      .then(({ type }) => {
        create({ dir, type });
      });
  });

commander.parse(process.argv);
