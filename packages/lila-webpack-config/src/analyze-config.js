import path from 'path';
import {
  basePlugins,
  baseLoaders,
  makeStyleLoaders,
  makeResolve,
} from './make';
import { defaultAnalyzeDir } from './defaults';

const { join } = path;

export default (lila, webpack, { page, cmd, config }) => {
  const { getSettings } = lila;
  const [
    cwd,
    srcDir,
    appDir,
    tmpDir,
    analyzeDir = defaultAnalyzeDir,
  ] = getSettings(['cwd', 'srcDir', 'appDir', 'tmpDir', 'analyzeDir']);
  const realAppDir = join(cwd, appDir);
  const realSrcDir = join(realAppDir, srcDir);
  const realAnalyzeDir = join(tmpDir, analyzeDir);

  return {
    entry: `${realSrcDir}/${page}/index.js`,
    output: {
      path: realAnalyzeDir,
      filename: 'index.js',
    },
    plugins: [...basePlugins(lila, webpack, { page, cmd, config })],
    module: {
      rules: [
        ...baseLoaders(lila, webpack, { page, cmd, config }),
        ...makeStyleLoaders(lila, webpack, { page, cmd, config }),
      ],
    },
    resolve: makeResolve(lila, webpack, { page, cmd, config }),
    mode: 'production',
  };
};
