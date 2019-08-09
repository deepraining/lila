import webpackPlugin from '../../../lila-webpack/lib';
import { forReact as reactWebpackConfigPlugin } from '../../lib';

export default lila => {
  lila.setSetting('src', 'src-react');

  webpackPlugin(lila);
  reactWebpackConfigPlugin(lila);

  return () => ({
    tasks: ['@lila/webpack'],
    cssModules: !0,
    cssModulesExclude: [/node_modules/, /\.g\./],
  });
};
