import path from 'path';
import base from './base';

const { join } = path;

export default (lila, rollup, { page, cmd, config }) => {
  const { getSettings } = lila;
  const [cwd, srcDir, buildDir] = getSettings(['cwd', 'src', 'build']);
  const realSrcDir = join(cwd, srcDir);
  const realBuildDir = join(cwd, buildDir);

  const { filename = 'index', name = 'Index', banner } = config;

  const baseConfig = base(lila, rollup, { page, cmd, config });

  return {
    input:
      page === 'index'
        ? `${realSrcDir}/index.js`
        : `${realSrcDir}/${page}/index.js`,
    output: [
      {
        file: `${realBuildDir}/${filename}.js`,
        format: 'cjs',
        banner,
      },
      {
        file: `${realBuildDir}/${filename}.m.js`,
        format: 'esm',
        banner,
      },
      {
        file: `${realBuildDir}/${filename}.umd.js`,
        format: 'umd',
        banner,
        name,
      },
    ],
    ...baseConfig,
  };
};
