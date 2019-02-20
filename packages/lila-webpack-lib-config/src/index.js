import merge from 'webpack-merge';
import start from './start';
import build from './build';
import { makeGetEntries } from './settings';
import { baseType, reactType, vueType } from './data';

const make = makeType => lila => {
  const { setSetting, getSettings } = lila;
  const [packages = !1] = getSettings(['packages']);

  setSetting('webpackConfigGenerator', webpack => ({ entry, cmd, config }) => {
    const { extra } = config;
    const extraWebpackConfig =
      typeof extra === 'function' ? extra(webpack) : extra;

    let webpackConfig = {};

    if (cmd === 'start')
      webpackConfig = start({ lila, webpack, entry, cmd, config, makeType });
    if (cmd === 'build')
      webpackConfig = build({ lila, webpack, entry, cmd, config, makeType });

    const { rules = [], plugins = [] } = config;

    if (rules.length && webpackConfig.module && webpackConfig.module.rules)
      webpackConfig.module.rules.push(...rules);
    if (plugins.length && webpackConfig.plugins)
      webpackConfig.plugins.push(...plugins);

    return extraWebpackConfig
      ? merge(webpackConfig, extraWebpackConfig)
      : webpackConfig;
  });

  setSetting('getEntries', makeGetEntries(packages));
};

export default make(baseType);

export const forReact = make(reactType);
export const forVue = make(vueType);
