import path from 'path';
import base from './base';

const { join } = path;

export default (lila, webpack, { entry, cmd, config }) => {
  const { getSettings } = lila;
  const [cwd, srcDir, tmpDir, analyzeDir = 'analyze'] = getSettings([
    'cwd',
    'src',
    'tmp',
    'analyze',
  ]);
  const srcPath = join(cwd, srcDir);
  const analyzePath = join(cwd, tmpDir, analyzeDir);

  const baseConfig = base(lila, webpack, { entry, cmd, config });

  return {
    entry: `${srcPath}/${entry}/index.js`,
    output: {
      path: analyzePath,
      filename: 'index.js',
    },
    ...baseConfig,
  };
};
