import path from 'path';
import progress from 'rollup-plugin-progress';
import base from './base';
import { defaultEntry } from '../../../util/constants';

const { join } = path;

export default (lila, rollup, { entry, cmd, config }) => {
  const { getSettings } = lila;
  const [root, srcDir, buildDir, packages = !1] = getSettings([
    'root',
    'src',
    'build',
    'packages',
  ]);
  const srcPath = join(root, srcDir);
  const buildPath = join(root, buildDir);

  const { filename = '', name = 'Index', banner, external, globals } = config;

  const baseConfig = base(lila, rollup, { entry, cmd, config });

  baseConfig.plugins.push(progress());

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
        globals,
        sourcemap: !0,
      },
    ],
    external,
    ...baseConfig,
  };
};
