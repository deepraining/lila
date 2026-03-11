import webpackPlugin from '../../../lila-webpack/lib';
import webpackVuePlugin from '../../lib';

export default lila => {
  lila.setSetting('src', 'src-vue');

  webpackPlugin(lila);
  webpackVuePlugin(lila);

  return () => ({
    tasks: ['@lila/webpack'],
  });
};
