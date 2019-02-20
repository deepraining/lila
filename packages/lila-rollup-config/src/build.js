import path from 'path';
import babel from 'rollup-plugin-babel';
import json from 'rollup-plugin-json';
import progress from 'rollup-plugin-progress';
import { defaultEntry } from '../../../util/constants';

const { join } = path;

export default ({ lila, entry, config }) => {
  const { getSettings } = lila;
  const [root, srcDir, buildDir, packages = !1] = getSettings([
    'root',
    'src',
    'build',
    'packages',
  ]);
  const srcPath = join(root, srcDir);
  const buildPath = join(root, buildDir);

  const {
    filename = '',
    name = 'Index',
    banner,
    babelPresets = [],
    babelPlugins = [],
  } = config;

  let entryPath =
    entry === defaultEntry
      ? `${srcPath}/index.js`
      : `${srcPath}/${entry}/index.js`;
  let outputPath = entry === defaultEntry ? buildPath : join(buildPath, entry);

  if (packages) {
    const packagesDir = typeof packages === 'string' ? packages : 'packages';
    entryPath = join(root, packagesDir, entry, srcDir, 'index.js');
    outputPath = join(root, packagesDir, entry, buildDir);
  }

  return {
    input: entryPath,
    output: [
      {
        file: `${outputPath}/${filename ? `${filename}.` : ''}cjs.js`,
        format: 'cjs',
        banner,
        sourcemap: !0,
      },
      {
        file: `${outputPath}/${filename ? `${filename}.` : ''}m.js`,
        format: 'esm',
        banner,
        sourcemap: !0,
      },
      {
        file: `${outputPath}/${filename ? `${filename}.` : ''}amd.js`,
        format: 'amd',
        banner,
        sourcemap: !0,
      },
      {
        file: `${outputPath}/${filename ? `${filename}.` : ''}umd.js`,
        format: 'umd',
        banner,
        name,
        sourcemap: !0,
      },
    ],
    plugins: [
      json(),
      babel({
        exclude: /node_modules/,
        presets: ['@babel/preset-env', '@babel/preset-flow', ...babelPresets],
        plugins: babelPlugins,
      }),
      progress(),
    ],
  };
};
