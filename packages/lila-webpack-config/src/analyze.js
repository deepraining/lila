import path from 'path';
import WebpackBar from 'webpackbar';
import SpeedMeasurePlugin from 'speed-measure-webpack-plugin';
import base from './base';
import { defaultEntry } from '../../../util/constants';

const { join } = path;

export default (lila, webpack, { entry, cmd, config }) => {
  const { getSettings } = lila;
  const [root, srcDir, tmpDir, analyzeDir = 'analyze'] = getSettings([
    'root',
    'src',
    'tmp',
    'analyze',
  ]);
  const srcPath = join(root, srcDir);
  const analyzePath = join(root, tmpDir, analyzeDir);

  const baseConfig = base(lila, webpack, { entry, cmd, config });

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
