import webpackPlugin from '../../../lila-webpack-lib/lib';
import { forVue } from '../../lib';

export default lila => {
  webpackPlugin(lila);
  forVue(lila);

  return () => ({
    tasks: ['@lila/webpack'],
    externals: ['vue'],
  });
};
