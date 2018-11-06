import path from 'path';
import base from './base';

const { join } = path;

export default (lila, rollup, { entry, cmd, config }) => {
  const { getSettings } = lila;
  const [cwd, srcDir, buildDir] = getSettings(['cwd', 'src', 'build']);
  const srcPath = join(cwd, srcDir);
  const buildPath = join(cwd, buildDir);

  const { filename = '', name = 'Index', banner } = config;

  const baseConfig = base(lila, rollup, { entry, cmd, config });

  return {
    input:
      entry === 'index'
        ? `${srcPath}/index.js`
        : `${srcPath}/${entry}/index.js`,
    output: [
      {
        file: `${buildPath}/${filename ? `${filename}.` : ''}cjs.js`,
        format: 'cjs',
        banner,
        sourcemap: !0,
      },
      {
        file: `${buildPath}/${filename ? `${filename}.` : ''}m.js`,
        format: 'esm',
        banner,
        sourcemap: !0,
      },
      {
        file: `${buildPath}/${filename ? `${filename}.` : ''}amd.js`,
        format: 'amd',
        banner,
        sourcemap: !0,
      },
      {
        file: `${buildPath}/${filename ? `${filename}.` : ''}umd.js`,
        format: 'umd',
        banner,
        name,
        sourcemap: !0,
      },
    ],
    ...baseConfig,
  };
};
