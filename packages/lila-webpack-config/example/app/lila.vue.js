import webpackPlugin from '../../../lila-webpack/lib';
import { forVue } from '../../lib';

export default lila => {
  lila.setSetting('src', 'src-vue');

  webpackPlugin(lila);
  forVue(lila);

  return () => ({
    tasks: ['@lila/webpack'],
  });
};
