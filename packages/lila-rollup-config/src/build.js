import path from 'path';
import base from './base';

const { join } = path;

export default (lila, rollup, { entry, cmd, config }) => {
  const { getSettings } = lila;
  const [cwd, srcDir, buildDir] = getSettings(['cwd', 'src', 'build']);
  const realSrcDir = join(cwd, srcDir);
  const realBuildDir = join(cwd, buildDir);

  const { filename = '', name = 'Index', banner } = config;

  const baseConfig = base(lila, rollup, { entry, cmd, config });

  return {
    input:
      entry === 'index'
        ? `${realSrcDir}/index.js`
        : `${realSrcDir}/${entry}/index.js`,
    output: [
      {
        file: `${realBuildDir}/${filename ? `${filename}.` : ''}cjs.js`,
        format: 'cjs',
        banner,
        sourcemap: !0,
      },
      {
        file: `${realBuildDir}/${filename ? `${filename}.` : ''}m.js`,
        format: 'esm',
        banner,
        sourcemap: !0,
      },
      {
        file: `${realBuildDir}/${filename ? `${filename}.` : ''}amd.js`,
        format: 'amd',
        banner,
        sourcemap: !0,
      },
      {
        file: `${realBuildDir}/${filename ? `${filename}.` : ''}umd.js`,
        format: 'umd',
        banner,
        name,
        sourcemap: !0,
      },
    ],
    ...baseConfig,
  };
};
