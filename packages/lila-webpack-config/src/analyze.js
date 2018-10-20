import path from 'path';
import base from './base';

const { join } = path;

export default (lila, webpack, { page, cmd, config }) => {
  const { getSettings } = lila;
  const [cwd, srcDir, tmpDir, analyzeDir = 'analyze'] = getSettings([
    'cwd',
    'src',
    'tmp',
    'analyze',
  ]);
  const realSrcDir = join(cwd, srcDir);
  const realAnalyzeDir = join(tmpDir, analyzeDir);

  const baseConfig = base(lila, webpack, { page, cmd, config });

  return {
    entry: `${realSrcDir}/${page}/index.js`,
    output: {
      path: realAnalyzeDir,
      filename: 'index.js',
    },
    ...baseConfig,
  };
};
