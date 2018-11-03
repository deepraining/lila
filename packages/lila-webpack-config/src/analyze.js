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
  const realSrcDir = join(cwd, srcDir);
  const realAnalyzeDir = join(cwd, tmpDir, analyzeDir);

  const baseConfig = base(lila, webpack, { entry, cmd, config });

  return {
    entry: `${realSrcDir}/${entry}/index.js`,
    output: {
      path: realAnalyzeDir,
      filename: 'index.js',
    },
    ...baseConfig,
  };
};
