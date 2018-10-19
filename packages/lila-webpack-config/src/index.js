import dev from './dev';
import analyze from './analyze';
import build from './build';

export default lila => {
  const { setSetting } = lila;

  setSetting('webpackConfigGenerator', webpack => ({ page, cmd, config }) => {
    if (cmd === 'dev' || cmd === 'serve')
      return dev(lila, webpack, { page, cmd, config });
    if (cmd === 'analyze') return analyze(lila, webpack, { page, cmd, config });
    if (cmd === 'build' || cmd === 'sync' || cmd === 'start')
      return build(lila, webpack, { page, cmd, config });

    return {};
  });
};
