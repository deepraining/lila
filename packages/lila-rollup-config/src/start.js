import path from 'path';
import html from 'rollup-plugin-fill-html';
import base from './base';

const { join } = path;

export default (lila, rollup, { entry, cmd, config }) => {
  const { getSettings } = lila;
  const [cwd, devDir] = getSettings(['cwd', 'dev']);
  const realDevDir = join(cwd, devDir);

  const baseConfig = base(lila, rollup, { entry, cmd, config });

  baseConfig.plugins.push(
    html({
      template: `${cwd}/${entry}/index.html`,
      filename: 'index.html',
    })
  );

  return {
    input: `${cwd}/${entry}/index.js`,
    output: {
      file: `${realDevDir}/index.js`,
      format: 'cjs',
      sourcemap: !0,
    },
    ...baseConfig,
  };
};
