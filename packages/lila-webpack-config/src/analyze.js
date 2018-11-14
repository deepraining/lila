import path from 'path';
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

  return {
    entry: `${srcPath}/${entry === defaultEntry ? '' : `${entry}/`}index.js`,
    output: {
      path: analyzePath,
      filename: 'index.js',
    },
    ...baseConfig,
  };
};
