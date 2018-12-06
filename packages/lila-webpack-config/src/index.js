import dev from './dev';
import analyze from './analyze';
import build from './build';
import { makeGetEntries, servePath } from './settings';

export default lila => {
  const { setSetting } = lila;

  setSetting('webpackConfigGenerator', webpack => ({ entry, cmd, config }) => {
    let webpackConfig = {};

    if (cmd === 'dev' || cmd === 'serve')
      webpackConfig = dev(lila, webpack, { entry, cmd, config });
    if (cmd === 'analyze')
      webpackConfig = analyze(lila, webpack, { entry, cmd, config });
    if (cmd === 'build' || cmd === 'sync' || cmd === 'start')
      webpackConfig = build(lila, webpack, { entry, cmd, config });

    const { rules = [], plugins = [] } = config;

    if (rules.length && webpackConfig.module && webpackConfig.module.rules)
      webpackConfig.module.rules.push(...rules);
    if (plugins.length && webpackConfig.plugins)
      webpackConfig.plugins.push(...plugins);

    return webpackConfig;
  });

  setSetting('getEntries', makeGetEntries(lila));
  setSetting('servePath', servePath);
};
