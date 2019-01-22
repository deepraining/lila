import build from './build';
import { makeGetEntries } from './settings';

export default lila => {
  const { setSetting, getSettings } = lila;
  const [packages = !1] = getSettings(['packages']);

  setSetting('rollupConfigGenerator', rollup => ({ entry, cmd, config }) => {
    let rollupConfig = {};

    if (cmd === 'build')
      rollupConfig = build(lila, rollup, { entry, cmd, config });

    const { plugins = [] } = config;

    if (plugins.length && rollupConfig.plugins)
      rollupConfig.plugins.push(...plugins);

    return rollupConfig;
  });

  setSetting('getEntries', makeGetEntries(packages));
};
