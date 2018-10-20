import start from './start';
import build from './build';
import { getPages } from './settings';

export default lila => {
  const { setSetting } = lila;

  setSetting('rollupConfigGenerator', rollup => ({ page, cmd, config }) => {
    let rollupConfig = {};

    if (cmd === 'start')
      rollupConfig = start(lila, rollup, { page, cmd, config });
    if (cmd === 'build')
      rollupConfig = build(lila, rollup, { page, cmd, config });

    const { plugins = [] } = config;

    if (plugins.length && rollupConfig.plugins)
      rollupConfig.plugins.push(...plugins);

    return rollupConfig;
  });

  setSetting('getPages', getPages);
};
