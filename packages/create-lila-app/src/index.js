import {program as commander} from 'commander';
import inquirer from 'inquirer';

import create from './create';
import { baseType, vueType } from './data';

// this should be dynamically imported, for lerna will modify package.json
const pkg = require('../package.json');

// version
commander
  .version(pkg.version)
  .arguments('<project-directory>')
  .action(dir => {
    inquirer.default
      .prompt([
        {
          type: 'list',
          name: 'type',
          message: 'Which type do you want to choose?',
          pageSize: 100,
          choices: [
            {
              name: `${baseType}: base environment to build`,
              value: baseType,
              short: baseType,
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
