import webpackPlugin from '../../../lila-webpack-lib/lib';
import { forReact } from '../../lib';

export default lila => {
  webpackPlugin(lila);
  forReact(lila);

  return () => ({
    tasks: ['@lila/webpack'],
    externals: ['react', 'react-dom'],
    cssModules: !0,
  });
};
