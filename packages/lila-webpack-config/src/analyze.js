import path from 'path';
import base from './base';

const { join } = path;

export default (lila, webpack, { page, cmd, config }) => {
  const { getSettings } = lila;
  const [cwd, srcDir, appDir, tmpDir, analyzeDir = 'analyze'] = getSettings([
    'cwd',
    'src',
    'app',
    'tmp',
    'analyze',
  ]);
  const realAppDir = join(cwd, appDir);
  const realSrcDir = join(realAppDir, srcDir);
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
