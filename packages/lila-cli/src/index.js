import commander from 'commander';

import pkg from '../package.json';
import { corePkg } from './local';

// build cmd
commander.command('build <page>', 'package source codes to production bundle');

commander
  .version(pkg.version + (corePkg ? ` (lila-core ${corePkg.version})` : ''))
  .usage('<cmd> [options]')
  .parse(process.argv);
