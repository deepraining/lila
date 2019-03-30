import path from 'path';
import WebpackBar from 'webpackbar';
import SpeedMeasurePlugin from 'speed-measure-webpack-plugin';
import base from './base';

const { join } = path;

export default ({ lila, webpack, entry, cmd, config, makeType }) => {
  const { getSettings } = lila;
  const [root, srcDir, tmpDir, defaultEntry] = getSettings([
    'root',
    'src',
    'tmp',
    'defaultEntry',
  ]);
  const srcPath = join(root, srcDir);
  const analyzePath = join(root, tmpDir, 'analyze');

  const baseConfig = base({ lila, webpack, entry, cmd, config, makeType });

  baseConfig.plugins.push(new WebpackBar(), new SpeedMeasurePlugin());

  return {
    entry: `${srcPath}/${entry === defaultEntry ? '' : `${entry}/`}index.js`,
    output: {
      path: analyzePath,
      filename: 'index.js',
    },
    ...baseConfig,
  };
};
