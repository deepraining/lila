import webpackPlugin from '../../../lila-webpack/lib';
import { forVue as vueWebpackConfigPlugin } from '../../lib';

export default lila => {
  lila.setSetting('src', 'src-vue');

  webpackPlugin(lila);
  vueWebpackConfigPlugin(lila);

  return () => ({
    tasks: ['@lila/webpack'],
  });
};
