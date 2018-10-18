import devConfig from './dev';
import analyzeConfig from './analyze';
import buildConfig from './build';

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
