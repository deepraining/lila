import start from './start';
import build from './build';
import { getEntries } from './settings';

export default lila => {
  const { setSetting } = lila;

  setSetting('rollupConfigGenerator', rollup => ({ entry, cmd, config }) => {
    let rollupConfig = {};

    if (cmd === 'start')
      rollupConfig = start(lila, rollup, { entry, cmd, config });
    if (cmd === 'build')
      rollupConfig = build(lila, rollup, { entry, cmd, config });

    const { plugins = [] } = config;

    if (plugins.length && rollupConfig.plugins)
      rollupConfig.plugins.push(...plugins);

    return rollupConfig;
  });

  setSetting('getEntries', getEntries);
};
