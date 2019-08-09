import merge from 'webpack-merge';
import dev from './dev';
import analyze from './analyze';
import build from './build';
import { baseType, reactType, vueType, reactVueType } from './data';

const make = makeType => lila => {
  const { setSetting } = lila;

  setSetting(
    'webpackConfigGenerator',
    webpack => ({ entry, cmd, config, argv }) => {
      const { extra, rebuildWebpackConfig } = config;
      const extraWebpackConfig =
        typeof extra === 'function' ? extra(webpack) : extra;

      let webpackConfig = {};

      if (cmd === 'dev' || cmd === 'serve')
        webpackConfig = dev({ lila, webpack, entry, cmd, config, makeType });
      if (cmd === 'analyze')
        webpackConfig = analyze({
          lila,
          webpack,
          entry,
          cmd,
          config,
          makeType,
        });
      if (cmd === 'build' || cmd === 'sync' || cmd === 'start')
        webpackConfig = build({ lila, webpack, entry, cmd, config, makeType });

      const { rules = [], plugins = [] } = config;

      if (rules.length && webpackConfig.module && webpackConfig.module.rules)
        webpackConfig.module.rules.push(...rules);
      if (plugins.length && webpackConfig.plugins)
        webpackConfig.plugins.push(...plugins);

      const finalWebpackConfig = extraWebpackConfig
        ? merge(webpackConfig, extraWebpackConfig)
        : webpackConfig;

      return rebuildWebpackConfig
        ? rebuildWebpackConfig({
            webpackConfig: finalWebpackConfig,
            lila,
            webpack,
            entry,
            cmd,
            config,
            argv,
          })
        : finalWebpackConfig;
    }
  );
};

export default make(baseType);

export const forReact = make(reactType);
export const forVue = make(vueType);
export const forReactVue = make(reactVueType);
