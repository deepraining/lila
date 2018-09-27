import json from 'rollup-plugin-json';

const pkgName = process.env.PKG_NAME;

export default {
  input: `packages/lila-${pkgName}/src/index.js`,
  output: {
    file: `packages/lila-${pkgName}/lib/index.js`,
    format: 'cjs',
  },
  plugins: [json()],
};
