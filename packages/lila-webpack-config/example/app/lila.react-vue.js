import webpackPlugin from '../../../lila-webpack/lib';
import { forReactVue as reactVueWebpackConfigPlugin } from '../../lib';

export default lila => {
  lila.setSetting('src', 'src-react-vue');

  webpackPlugin(lila);
  reactVueWebpackConfigPlugin(lila);

  return () => ({
    tasks: ['@lila/webpack'],
    cssModules: !0,
    cssModulesExclude: [/node_modules/, /\.g\./],
  });
};
