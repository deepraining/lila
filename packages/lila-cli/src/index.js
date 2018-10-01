import commander from 'commander';

import pkg from '../package.json';
import { lilaCore, lilaCorePkg } from './local';

// version
commander.version(
  pkg.version + (lilaCorePkg ? ` (lila-core ${lilaCorePkg.version})` : '')
);

if (lilaCore) {
  const { getCommands } = lilaCore;
  const commands = getCommands();

  if (commands && commands.length) {
    commands.forEach(cmd => {
      cmd(commander);
    });
  }
}

commander.parse(process.argv);
