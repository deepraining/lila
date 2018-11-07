import path from 'path';
import html from 'rollup-plugin-fill-html';
import base from './base';

const { join } = path;

export default (lila, rollup, { entry, cmd, config }) => {
  const { getSettings } = lila;
  const [root, devDir] = getSettings(['root', 'dev']);
  const devPath = join(root, devDir);

  const baseConfig = base(lila, rollup, { entry, cmd, config });

  baseConfig.plugins.push(
    html({
      template: `${root}/${entry}/index.html`,
      filename: 'index.html',
    })
  );

  return {
    input: `${root}/${entry}/index.js`,
    output: {
      file: `${devPath}/index.js`,
      format: 'cjs',
      sourcemap: !0,
    },
    ...baseConfig,
  };
};
