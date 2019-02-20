import commander from 'commander';
import inquirer from 'inquirer';

import create from './create';
import {
  universalType,
  normalType,
  reactType,
  vueType,
  reactVueType,
  normalLibType,
  reactLibType,
  vueLibType,
  rollupType,
} from './data';

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
              name: `${normalType}: ready-made environment to build normal application by webpack`,
              value: normalType,
              short: normalType,
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
            {
              name: `${reactVueType}: ready-made environment to build both React and Vue application by webpack`,
              value: reactVueType,
              short: reactVueType,
            },
            {
              name: `${normalLibType}: ready-made environment to build normal library by webpack`,
              value: normalLibType,
              short: normalLibType,
            },
            {
              name: `${reactLibType}: ready-made environment to build React library by webpack`,
              value: reactLibType,
              short: reactLibType,
            },
            {
              name: `${vueLibType}: ready-made environment to build Vue library by webpack`,
              value: vueLibType,
              short: vueLibType,
            },
            {
              name: `${rollupType}: ready-made environment to build pure Javascript library by rollup`,
              value: rollupType,
              short: rollupType,
            },
          ],
        },
      ])
      .then(({ type }) => {
        create({ dir, type });
      });
  });

commander.parse(process.argv);
