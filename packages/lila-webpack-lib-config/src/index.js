import start from './start';
import build from './build';
import { getPages } from './settings';

export default lila => {
  const { setSetting } = lila;

  setSetting('webpackConfigGenerator', webpack => ({ page, cmd, config }) => {
    let webpackConfig = {};

    if (cmd === 'start')
      webpackConfig = start(lila, webpack, { page, cmd, config });
    if (cmd === 'build')
      webpackConfig = build(lila, webpack, { page, cmd, config });

    const { rules = [], plugins = [] } = config;

    if (rules.length && webpackConfig.module && webpackConfig.module.rules)
      webpackConfig.module.rules.push(...rules);
    if (plugins.length && webpackConfig.plugins)
      webpackConfig.plugins.push(...plugins);

    return webpackConfig;
  });

  setSetting('getPages', getPages);
};
