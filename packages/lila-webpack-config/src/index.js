import devConfig from './dev-config';
import analyzeConfig from './analyze-config';
import buildConfig from './build-config';

export default lila => {
  const { setSetting } = lila;

  setSetting('webpackConfigGenerator', webpack => ({ page, cmd, config }) => {
    if (cmd === 'dev') return devConfig(lila, webpack, { page, cmd, config });
    if (cmd === 'analyze')
      return analyzeConfig(lila, webpack, { page, cmd, config });
    if (cmd === 'build' || cmd === 'sync')
      return buildConfig(lila, webpack, { page, cmd, config });

    return {};
  });
};
