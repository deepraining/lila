import webpackPlugin from '../../../lila-webpack/lib';
import { forReact } from '../../lib';

export default lila => {
  lila.setSetting('src', 'src-react');

  webpackPlugin(lila);
  forReact(lila);

  return () => ({
    tasks: ['@lila/webpack'],
    cssModules: !0,
  });
};
